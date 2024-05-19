-- Create the librarians table
CREATE TABLE librarians (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create the books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    cover_image VARCHAR(255),
    summary TEXT
);

-- Insert data into the librarians table
INSERT INTO librarians (username, password) VALUES 
('admin', 'hashed_password1'), -- replace 'hashed_password1' with an actual hashed password
('librarian1', 'hashed_password2'); -- replace 'hashed_password2' with an actual hashed password

-- Insert data into the books table
INSERT INTO books (title, author, genre, cover_image, summary) VALUES 
('The Da Vinci Code', 'Dan Brown', 'Thriller', 'path/to/da_vinci_code.jpg', 'A symbologist and a cryptologist uncover a religious mystery protected by a secret society for two thousand years.'),
('Outlander', 'Diana Gabaldon', 'Romance', 'path/to/outlander.jpg', 'A WWII nurse is transported back in time to 1743 Scotland, where she encounters intrigue, danger, and love.'),
('Dune', 'Frank Herbert', 'Sci-Fi', 'path/to/dune.jpg', 'A science fiction saga set on the desert planet Arrakis, focusing on the young Paul Atreides and his rise to power.'),
('The Book Thief', 'Markus Zusak', 'History', 'path/to/book_thief.jpg', 'A young girl in Nazi Germany finds solace by stealing books and sharing them with others during WWII.'),
('Gone Girl', 'Gillian Flynn', 'Thriller', 'path/to/gone_girl.jpg', 'A psychological thriller about the disappearance of Amy Dunne and the ensuing media frenzy and police investigation.');
