import { type } from "os";
import client from "../database";

export type Order = {
    sn?: number;
    user_id: string;
    status: string
};

export class OrderStore {
    async create(o: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
            const result = await conn.query(sql, [o.user_id, o.status]);
            const order = result.rows[0];
            conn.release();

            return order;
        }catch(error){
            throw new Error("Unable to create order with ID:" + o.user_id + " because, " + error);
        }
    }

    
}