/* Replace with your SQL commands */

-- Table: user_details

CREATE TABLE user_details
(
    sn SERIAL PRIMARY KEY,
    user_id VARCHAR(20),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(100)
);
