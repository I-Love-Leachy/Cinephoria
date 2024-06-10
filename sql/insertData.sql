-- Inserting data into users table
INSERT INTO users (first_name, last_name, email, password, role) VALUES
('John', 'Doe', 'john.doe@example.com', 'password123', 'admin'),
('Jane', 'Smith', 'jane.smith@example.com', 'password123', 'user'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'password123', 'employee');

-- Inserting data into movies table
INSERT INTO movies (title, duration, genre, pg, banner, poster, video, favorite, description, casting, release_date) VALUES
('Inception', 148, 'Sci-Fi', 13, 'inception_banner.jpg', 'inception_poster.jpg', 'inception_trailer.mp4', false, 'A mind-bending thriller.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', '2010-07-16'),
('The Dark Knight', 152, 'Action', 13, 'dark_knight_banner.jpg', 'dark_knight_poster.jpg', 'dark_knight_trailer.mp4', false, 'A gripping action film.', 'Christian Bale, Heath Ledger', '2008-07-18');

-- Inserting data into cinemas table
INSERT INTO cinemas (name, location, country, images) VALUES
('Cinema City', 'Downtown', 'USA', 'cinema_city.jpg'),
('Movie Palace', 'Uptown', 'USA', 'movie_palace.jpg');

-- Inserting data into rooms table
INSERT INTO rooms (cinema_id, name, quality) VALUES
(1, 'Room 1', 'Standard'),
(1, 'Room 2', 'IMAX'),
(2, 'Room 1', 'Standard');

-- Inserting data into seats table
INSERT INTO seats (room_id, seat_label, accessibility) VALUES
(1, 'A1', false),
(1, 'A2', false),
(2, 'B1', true),
(2, 'B2', false);

-- Inserting data into reviews table
INSERT INTO reviews (user_id, movie_id, rating, comment, status, created_at) VALUES
(1, 1, 5, 'Amazing movie!', true, CURRENT_TIMESTAMP),
(2, 2, 4, 'Great action scenes.', false, CURRENT_TIMESTAMP);

-- Inserting data into showtimes table
INSERT INTO showtimes (movie_id, cinema_id, room_id, day, start_time, end_time, price, qr) VALUES
(1, 1, 1, '2024-06-07', '14:00', '16:30', 10, 'QR1'),
(2, 1, 2, '2024-06-07', '17:00', '19:30', 12, 'QR2');

-- Inserting data into reservations table
INSERT INTO reservations (user_id, cinema_id, showtimes_id, seats_reserved, status) VALUES
(1, 1, 1, 'A1', true),
(2, 1, 2, 'B1', false);

-- Inserting data into incident table
INSERT INTO incident (room_id, seat_id, user_id, description, report_date) VALUES
(1, 1, 1, 'Broken seat at front row', '2024-06-01'),
(2, 3, 2, 'Entry door knob missing', '2024-06-02');