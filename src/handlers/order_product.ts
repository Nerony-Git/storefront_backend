import { Request, Response } from "express";
import { Order_Product, Order_ProductStore } from "../models/order_product";

const store = new Order_ProductStore();

const addProduct = async (req: Request, res: Response) => {
    const order_product: Order_Product = {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
    };

    try {
        const added_product = await store.addProduct(order_product);
        res.json(added_product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export default addProduct;
