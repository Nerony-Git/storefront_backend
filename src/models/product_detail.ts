import { type } from "os";
import client from "../database";

export type Product = {
    sn?: number;
    product_id: string;
    product_name: string;
    product_price: number;
    product_category: string;
};

export class ProductStore {
    async create(p: Product): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = "INSERT INTO product_details (product_id, product_name, product_price, product_category) VALUES ($1, $2, $3, $4) RETURNING *";
            const result = await conn.query(sql, [p.product_id, p.product_name, p.product_price, p.product_category]);
            const product = result.rows[0];
            conn.release();

            return product;
        }catch (error){
            throw new Error("Unable to create product: " + p.product_name + " because, " + error);
        }
    }

    async read(pid: number): Promise<Product> {
        try{
            const conn = await client.connect();
            const sql = "SELECT * FROM product_details WHERE sn = $1";
            const result = await conn.query(sql, [pid]);
            const product = result.rows[0];
            conn.release();

            return product;
        }catch(error){
            throw new Error("Failed to load product details of product with ID: " + pid + " because, " + error);
        }
    }

}