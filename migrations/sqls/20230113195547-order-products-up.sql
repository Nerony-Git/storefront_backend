/* Replace with your SQL commands */

-- Table: order_products

CREATE TABLE order_products
(
    sn SERIAL PRIMARY KEY,
    quantity integer,
    order_id BIGINT REFERENCES orders(sn),
    product_id BIGINT REFERENCES product_details(sn)
);