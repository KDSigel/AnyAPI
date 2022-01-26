-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS strangers;

CREATE TABLE strangers (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  description TEXT NOT NULL,
  annoyance TEXT NOT NULL
);