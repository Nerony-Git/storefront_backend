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
            message:
                "Product " +
                new_product.product_name +
                " was added successfully",
        });
    } catch (error) {
        res.status(400).send({
            message: "Failed to add product because, " + error,
        });
    }
};

const read = async (req: Request, res: Response) => {
    const pid: number = +req.params.id;
    try {
        const product = await store.read(pid);
        res.status(200).json({
            results: product,
            message:
                "Product with ID: " +
                pid +
                " was retrieved successfully",
        });
    } catch (error) {
        res.status(400).send({
            message: "Failed to retrieve product because, " + error,
        });
    }
};

const update = async (req: Request, res: Response) => {
    const pid: number = +req.params.id;
    const product: Product = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_category: req.body.product_category
    };
    try {
        const updated_Product = await store.update(pid, product);
        res.status(200).json({
            results: updated_Product,
            message:
                "Product with ID: " + pid + " was successfully updated.",
        });
    } catch (error) {
        res.status(400).send({
            message: "Failed to update product because, " + error,
        });
    }
};

const remove = async (req: Request, res: Response) => {
    const pid: number = +req.params.id;
    try {
        const removed_product = await store.delete(pid);
        res.status(200).json({
            results: removed_product,
            message:
                "Product with ID: " + pid + " was successfully deleted.",
        });
    } catch (error) {
        res.status(400).send({
            message: "Failed to delete product because, " + error,
        });
        console.log(error);
    }
};

const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.status(200).json({
            results: products,
            message: products.length + " products was retrieved successfully.",
        });
    } catch (error) {
        res.status(400).send({
            message: "Failed to retrieve products because, " + error,
        });
    }
};

export default {
    create,
    read,
    update,
    remove,
    index,
};
