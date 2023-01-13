/* Replace with your SQL commands */

-- Table: orders

CREATE TABLE orders
(
    sn SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES user_details(sn),
    status VARCHAR(20)
);