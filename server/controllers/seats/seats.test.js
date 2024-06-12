const request = require('supertest');
const app = require('../../app');
const DB = require('../../config/postgres.config');

describe("TEST Seat api", () => {
    let testSeatId;

    beforeAll(async () => {
        // Clean up the database
        await DB.query('DELETE FROM seats');
        await DB.query('DELETE FROM rooms');
        await DB.query('DELETE FROM cinemas');
        await DB.query('DELETE FROM users');

        // Insert necessary data
        await DB.query(`
            INSERT INTO users (user_id, first_name, last_name, email, password, role) VALUES
            (1, 'John', 'Doe', 'john.doe@example.com', 'password123', 'admin'),
            (2, 'Jane', 'Smith', 'jane.smith@example.com', 'password123', 'user');
        `);

        await DB.query(`
            INSERT INTO cinemas (cinema_id, name, location, country, images) VALUES
            (1, 'Cinema City', 'Downtown', 'USA', 'cinema_city.jpg');
        `);

        await DB.query(`
            INSERT INTO rooms (room_id, cinema_id, name, quality) VALUES
            (1, 1, 'Room 1', 'Standard');
        `);

        await DB.query(`
            INSERT INTO seats (seat_id, room_id, seat_label, accessibility) VALUES
            (1, 1, 'A1', false);
        `);
    });

    afterAll(async () => {
        await DB.query('DELETE FROM seats');
        await DB.query('DELETE FROM rooms');
        await DB.query('DELETE FROM cinemas');
        await DB.query('DELETE FROM users');
        await DB.closePool();
    });

    afterEach(async () => {
        if (testSeatId) {
            const query = `DELETE FROM seats WHERE seat_id = $1`;
            await DB.query(query, [testSeatId]);
            testSeatId = undefined;
        }
    });


    // TEST Get Seats
    describe("TEST Get /seats", () => {
        test('should respond with 200 ok', async () => {
            await request(app)
                .get('/api/v1/seats')
                .expect('content-type', /json/)
                .expect(200);
        });
    });

    // TEST Get Seats By Id
    describe("TEST Get /seats/:id", () => {
        test('Should respond with 200 ok', async () => {
            await request(app)
                .get('/api/v1/seats/1')
                .expect('content-type', /json/)
                .expect(200);
        });
        test('Should respond with 404 /seats/:id', async () => {
            await request(app)
                .get('/api/v1/seats/1101')
                .expect('content-type', /json/)
                .expect(404);
        });
    });

    // TEST Post Seats
    describe("TEST Post /seats", () => {
        const seatsData = {
            room_id: 1,
            seat_label: "A2",
            accessibility: false
        };
        test('Should respond with 201 created', async () => {
            const response = await request(app)
                .post('/api/v1/seats')
                .send(seatsData)
                .expect('content-type', /json/)
                .expect(201);

            testSeatId = response.body.seat_id;
        });
        test('Should respond with 400', async () => {
            await request(app)
                .post('/api/v1/seats')
                .send({})
                .expect('content-type', /json/)
                .expect(400);
        });
    });

    // TEST Update Seats
    describe("TEST Update /seats/:id", () => {
        const updatedSeatData = {
            room_id: 1,
            seat_label: "A2",
            accessibility: false
        };
        test('Should respond with 201 created', async () => {
            // First, we create a Seat to update
            const createResponse = await request(app)
                .post('/api/v1/seats')
                .send({
                    room_id: 1,
                    seat_label: "A2",
                    accessibility: false
                })
                .expect('content-type', /json/)
                .expect(201);

            testSeatId = createResponse.body.seat_id;

            // Then, we update the created Seat
            await request(app)
                .put(`/api/v1/seats/${testSeatId}`)
                .send(updatedSeatData)
                .expect('content-type', /json/)
                .expect(200);
        });
    });


    // TEST Delete Seats
describe("TEST Delete /seats/:id", () => {
    test('Should respond with 201 created', async () => {
        // First, we create a Seat to delete
        const createResponse = await request(app)
            .post('/api/v1/seats')
            .send({
                room_id: 1,
                seat_label: "A2",
                accessibility: false
            })
            .expect('content-type', /json/)
            .expect(201);

        const seatIdToDelete = createResponse.body.seat_id;

        // Then, we delete the created seat
        await request(app)
            .delete(`/api/v1/seats/${seatIdToDelete}`)
            .expect('content-type', /json/)
            .expect(200);

        // Finally, we verify the seat was deleted
        await request(app)
            .get(`/api/v1/seats/${seatIdToDelete}`)
            .expect('content-type', /json/)
            .expect(404);
    });

    test('Should respond with 404 for non-existing seat', async () => {
        await request(app)
            .delete('/api/v1/seats/9999') // Assuming 9999 does not exist
            .expect('content-type', /json/)
            .expect(404);
    });
});

});
