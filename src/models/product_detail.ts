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

    async update(p: Product): Promise<Product> {
        try{
            const conn = await client.connect();
            const sql = "UPDATE product_details SET product_id = $1, product_name = $2, product_price= $3, product_category = $4 WHERE sn = $5 RETURNING *";
            const result = await conn.query(sql, [p.product_id, p.product_name, p.product_price, p.product_category, p.sn]);
            const product = result.rows[0];
            conn.release();

            return product;
        }catch(error){
            throw new Error("Failed to update details of product: " + p.product_name + " because, " + error);
        }
    }

    async delete(pid: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = "DELETE FROM product_details WHERE sn = $1";
            const result = await conn.query(sql, [pid]);
            const product = result.rows[0];
            conn.release();

            return product;
        }catch(error){
            throw new Error("Product with ID: " + pid + "can't be deleted because, " + error);
        }
    }

    async index(): Promise<Product[]> {
        try{
            const conn = await client.connect();
            const sql = "SELECT * FROM product_details";
            const result = await conn.query(sql);
            const products = result.rows;
            conn.release();

            return products;
        }catch(error){
            throw new Error("Can not get products because, " + error);
        }
    }

}