CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    useremail VARCHAR(50) UNIQUE,
    password VARCHAR,
    hours FLOAT
);