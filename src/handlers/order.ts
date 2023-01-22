import { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
    const order: Order = {
        user_id: req.body.user_id,
        status: req.body.status,
    };
    try {
        const newOrder = await store.create(order);
        res.status(200).json({
            results: newOrder,
            message:
                "New order with ID: " + newOrder.sn + " was added successfully",
        });
    } catch (error) {
        res.status(400).send({
            message: "Failed to create order because, " + error,
        });
    }
};

const read = async (req: Request, res: Response) => {
    const order_id: number = +req.params.id;
    try {
        const order = await store.read(order_id);
        res.status(200).json({
            results: order,
            message:
                "Order with ID: " + order_id + " was retrieved successfully.",
        });
    } catch (error) {
        res.status(400).send({
            message: "Failed to retrieve order because, " + error,
        });
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

const index = async (req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.status(200).json({
            results: orders,
            message: orders.length + " orders was retrieved successfully.",
        });
    } catch (error) {
        res.status(400).send({
            message: "Failed to retrieve orders because, " + error,
        });
    }
};

export default {
    create,
    read,
    remove,
    index,
};
