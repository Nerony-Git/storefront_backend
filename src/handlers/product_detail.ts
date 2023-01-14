import { Request, Response } from "express";
import { Product, ProductStore } from "../models/product_detail";

const store = new ProductStore();

const create = async (req: Request, res: Response) => {
    const product: Product = {
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_category: req.body.product_category
    };
    try {
        const new_product = await store.create(product);
        res.status(200).json({
            results: new_product,
            message: "Product " + new_product.product_name + " was added successfully"
        });
    }catch (error) {
        res.status(400).send({message: "Failed to add product because, " + error});
    }
};
