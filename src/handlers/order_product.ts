import { Request, Response } from "express";
import { Order_ProductStore } from "../models/order_product";

const store = new Order_ProductStore();

const addProduct = async (req: Request, res: Response) => {
    const order_id: string = req.body.order_id;
    const product_id: string = req.body.product_id;
    const quantity: number = parseInt(req.body.quantity);

    try {
        const added_product = await store.addProduct(quantity, order_id, product_id);
        res.json(added_product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const remove = async (req: Request, res: Response) => {
    const order_id: number = +req.params.id;
    try {
        const remove_order = await store.delete(order_id);
        res.status(200).json({
            results: remove_order,
            message:
                "Order with ID: " + order_id + " was deleted successfully.",
        });
    } catch (error) {
        res.status(400).send({
            message: "Failed to delete order because, " + error,
        });
        console.log(error);
    }
};

export default {
    addProduct,
    remove
};
