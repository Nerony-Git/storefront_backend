import { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
    const order: Order = {
        user_id: req.body.user_id,
        status: req.body.status,
    }
    try {
        const newOrder = await store.create(order);
        res.status(200).json({
            results: newOrder,
            message: "New order with ID: " + newOrder.sn + " was added successfully"
        });
    }catch(error) {
        res.status(400).send({message: "Failed to create order because, " + error});
    }
};

