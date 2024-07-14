-- Inserting data into users table
INSERT INTO users (first_name, last_name, email, password, role, must_change_password, username)
VALUES
  ('John', 'Doe', 'john.doe@example.com', 'hashed_password', 'admin', false, 'johndoe'),
  ('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password', 'user', false, 'janesmith'),
  ('Michael', 'Johnson', 'michael.johnson@example.com', 'hashed_password', 'employee', false, 'michaelj');

-- Inserting data into movies table
INSERT INTO movies (title, duration, genre, pg, banner, poster, video, favorite, description, casting, release_date, added_date)
VALUES
  ('Inception', 148, 'Sci-Fi, Action', 12, 'http://example.com/banner1.jpg', 'http://example.com/poster1.jpg', NULL, true, 'Plot summary of Inception.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', '2010-07-16', '2023-07-16 12:00:00'),
  ('The Shawshank Redemption', 142, 'Drama', 18, 'http://example.com/banner2.jpg', 'http://example.com/poster2.jpg', NULL, false, 'Plot summary of The Shawshank Redemption.', 'Tim Robbins, Morgan Freeman', '1994-09-23', '2023-07-16 13:00:00'),
  ('The Dark Knight', 152, 'Action, Crime, Drama', 14, 'http://example.com/banner3.jpg', 'http://example.com/poster3.jpg', NULL, true, 'Plot summary of The Dark Knight.', 'Christian Bale, Heath Ledger', '2008-07-18', '2023-07-16 14:00:00');

-- Inserting data into cinemas table
INSERT INTO cinemas (name, location, country, images)
VALUES
  ('Cineplex', '123 Main St', 'USA', 'http://example.com/cineplex1.jpg'),
  ('Odeon', '456 Elm St', 'UK', 'http://example.com/odeon1.jpg'),
  ('Cinema Paradiso', '789 Oak St', 'Italy', 'http://example.com/cinema_paradiso1.jpg');

-- Inserting data into rooms table
INSERT INTO rooms (cinema_id, name, quality)
VALUES
  (1, 'Room 1', 'Standard'),
  (1, 'Room 2', 'VIP'),
  (2, 'Room A', 'Standard'),
  (3, 'Room X', 'Premium');

-- Inserting data into seats table
INSERT INTO seats (room_id, seat_label, accessibility)
VALUES
  (1, 'A1', true),
  (1, 'A2', true),
  (1, 'B1', true),
  (2, 'VIP1', false),
  (2, 'VIP2', false),
  (3, 'A', true),
  (4, 'X1', true),
  (4, 'X2', true);

-- Inserting data into reviews table
INSERT INTO reviews (user_id, movie_id, rating, comment, status, created_at)
VALUES
  (1, 1, 5, 'Great movie!', true, '2023-07-16 15:00:00'),
  (2, 2, 4, 'Amazing film, loved it.', true, '2023-07-16 16:00:00'),
  (3, 3, 5, 'One of the best superhero movies.', true, '2023-07-16 17:00:00');

-- Inserting data into showtimes table
INSERT INTO showtimes (movie_id, cinema_id, room_id, day, start_time, end_time, price)
VALUES
  (1, 1, 1, '2023-07-17', '14:00:00', '16:28:00', 10),
  (2, 2, 2, '2023-07-17', '15:00:00', '17:22:00', 12),
  (3, 3, 4, '2023-07-17', '16:00:00', '18:30:00', 15);

-- Inserting data into reservations table
INSERT INTO reservations (user_id, cinema_id, showtimes_id, seats_reserved, status, reserved_at, token)
VALUES
  (1, 1, 1, '{"A1", "A2"}', true, '2023-07-16 18:00:00', 'token123'),
  (2, 2, 2, '{"VIP1", "VIP2"}', true, '2023-07-16 19:00:00', 'token456'),
  (3, 3, 3, '{"X1", "X2"}', true, '2023-07-16 20:00:00', 'token789');

-- Inserting data into incident table
INSERT INTO incident (room_id, seat_id, description, report_date)
VALUES
  (1, 1, 'Broken seat.', '2023-07-16'),
  (2, 2, 'Stained carpet.', '2023-07-16'),
  (3, 3, 'Audio issue.', '2023-07-16');

-- Inserting data into cinema_employees table
INSERT INTO cinema_employees (cinema_id, user_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3);
