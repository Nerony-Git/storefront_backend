import client from "../database";

export type Order = {
    sn?: number;
    user_id: string;
    status: string;
};

export class OrderStore {
    async create(o: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql =
                "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
            const result = await conn.query(sql, [o.user_id, o.status]);
            const order = result.rows[0];
            conn.release();

            return order;
        } catch (error) {
            throw new Error(
                "Unable to create order with ID:" +
                    o.user_id +
                    " because, " +
                    error
            );
        }
    }

    async read(oid: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql =
                "SELECT orders.sn, orders.user_id, orders.status, order_products.product_id, order_products.quantity FROM orders INNER JOIN order_products ON orders.sn = order_products.order_id WHERE orders.sn = $1";
            const result = await conn.query(sql, [oid]);
            const order = result.rows[0];
            conn.release();

            return order;
        } catch (error) {
            throw new Error(
                "Failed to load order details of order with ID: " +
                    oid +
                    " because, " +
                    error
            );
        }
    }

    async delete(oid: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = "DELETE FROM orders WHERE sn = $1";
            const result = await conn.query(sql, [oid]);
            const order = result.rows[0];
            conn.release();

            return order;
        } catch (error) {
            throw new Error(
                "Order with ID: " + oid + " can't be deleted because, " + error
            );
        }
    }

    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM orders";
            const result = await conn.query(sql);
            const order = result.rows;
            conn.release();

            return order;
        } catch (error) {
            throw new Error("Can not get orders because, " + error);
        }
    }
}
