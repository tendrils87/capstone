CREATE EXTENSION pgcrypto;
CREATE TABLE users (id SERIAL PRIMARY KEY, first TEXT NOT NULL, last TEXT NOT NULL, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
CREATE TABLE posts (post_id SERIAL PRIMARY KEY, user_id INT, title TEXT, content TEXT, CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id));
INSERT INTO users(first,last,username,password) VALUES ('John','Doe','johndoe',crypt('password',gen_salt('bf'))), ('Jill','Doe','jilldoe', crypt('password',gen_salt('bf')));
INSERT INTO posts(user_id, title, content) VALUES (1, 'Johns First Post', 'This is my first post.'), (2, 'Jills First Post', 'This is my first post');