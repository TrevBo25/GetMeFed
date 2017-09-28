create table favorites(
    id SERIAL PRIMARY KEY,
    userid TEXT,
    type VARCHAR(20),
    favoriteurl TEXT,
    favoritename TEXT,
    favoriteimg TEXT
);