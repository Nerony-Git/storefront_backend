import client from "../database";

export type Order_Product = {
    sn?: number;
    quantity: number;
    order_id: string;
    product_id: string;
};

export class Order_ProductStore {
    async addProduct(
        quantity: number,
        order_id: string,
        product_id: string
    ): Promise<Order_Product> {
        try {
            const conn = await client.connect();
            const sql =
                "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [
                quantity,
                order_id,
                product_id,
            ]);
            const order = result.rows[0];
            conn.release();

            return order;
        } catch (error) {
            throw new Error(
                "Product with ID: " +
                    product_id +
                    " can't be added to order with ID: " +
                    order_id +
                    " because, " +
                    error
            );
        }
    }

    async delete(oid: number): Promise<Order_Product> {
        try {
            const conn = await client.connect();
            const sql = "DELETE FROM order_products WHERE sn = $1";
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
}
