CREATE TABLE IF NOT EXISTS favorites(
    id SERIAL PRIMARY KEY,
    userid TEXT,
    type VARCHAR(20),
    code TEXT,
    name TEXT,
    img TEXT,
    notes TEXT
);