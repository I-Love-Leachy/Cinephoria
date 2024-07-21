BEGIN;

-- Verrouillage de la transaction pour éviter les conflits
SELECT pg_advisory_xact_lock(1);

-- Vérification de la disponibilité des sièges réservés
DO $$ 
DECLARE
  seats_reserved_json jsonb := '[{"seat_id": 1}, {"seat_id": 2}]';
  showtimes_id integer := 123;
BEGIN
  IF EXISTS (
    SELECT 1
    FROM reservations
    WHERE showtimes_id = showtimes_id AND seats_reserved @> seats_reserved_json
  ) THEN
    RAISE EXCEPTION 'One or more seats are already reserved!';
  END IF;
END $$;

-- Insertion d'une nouvelle réservation
INSERT INTO reservations (user_id, cinema_id, showtimes_id, seats_reserved, status, reserved_at, token)
VALUES (1, 1, 123, '[{"seat_id": 1}, {"seat_id": 2}]'::jsonb, false, NOW(), 'random_token_string');

COMMIT;
