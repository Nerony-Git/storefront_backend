import client from "../database";

export type Order_Product = {
    sn?: number;
    quantity: number;
    order_id: string;
    product_id: string;
}

export class Order_ProductStore{
    async addProduct(op: Order_Product): Promise<Order_Product> {
        try {
            const conn = await client.connect();
            const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [op.quantity, op.order_id, op.product_id]);
            const order = result.rows[0];
            conn.release();

            return order;
        }catch (error){
            throw new Error("Product with ID: " + op.product_id + " can't be added to order with ID: " + op.order_id + " because, " + error);
            
        }
    }

}