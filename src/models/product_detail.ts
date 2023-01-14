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
            const sql = "INSERT INTO product_details ()";
        }
    }
}