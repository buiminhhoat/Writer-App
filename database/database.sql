DROP DATABASE IF EXISTS writer_app;

CREATE DATABASE writer_app CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE writer_app;

CREATE TABLE user
(
    user_id      bigint(20) AUTO_INCREMENT,
    name	 varchar(50),
    email        varchar(100),
    password_hash varchar(100),
    PRIMARY KEY (user_id, email)
);

CREATE TABLE post
(
    post_id     bigint(20) AUTO_INCREMENT,
    user_id    	bigint(20),
    content     text,
    date_modified   datetime,
    title       varchar(200),
    PRIMARY KEY (post_id)
);

ALTER TABLE post ADD CONSTRAINT post_user_fk FOREIGN KEY IF NOT EXISTS (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE;
