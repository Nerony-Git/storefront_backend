/* Replace with your SQL commands */

-- Table: product_details

CREATE TABLE product_details
(
    sn SERIAL PRIMARY KEY,
    product_ID VARCHAR(20),
    product_name VARCHAR(50),
    product_price integer,
    product_category VARCHAR(50)
);