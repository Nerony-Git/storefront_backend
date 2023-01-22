import { Request, Response } from "express";
import { User, UserStore } from "../models/user_detail";
import * as jwt from "jsonwebtoken";

const store = new UserStore();

const create = async (req: Request, res: Response) => {
    const user: User = {
        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const new_user = await store.create(user);
        const token = jwt.sign(
            { name: new_user.first_name + " " + new_user.last_name },
            process.env.TOKEN_SECRET + ""
        );
        res.json({ idToken: token });
    } catch (error) {
        res.status(400);
        res.json({ error });
    }
};

const read = async (req: Request, res: Response) => {
    try {
        const user = await store.read(req.params.sn);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const remove = async (req: Request, res: Response) => {
    const uid: number = +req.params.id;
    try {
        const deleted_Product = await store.delete(uid);
        res.json(deleted_Product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const index = async (req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.status(200).json({
            results: users,
            message: users.length + " users details was retrieved successfully",
        });
    } catch (error) {
        res.status(400);
        res.json("Token rejected because, " + error);
    }
};

const login = async (req: Request, res: Response) => {
    const user_input: User = {
        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const user = await store.authenticate(
            user_input.username,
            user_input.password
        );
        if (user === null) {
            res.json("Please sign up first.");
        } else {
            const token = jwt.sign(
                { name: user.first_name + " " + user.last_name },
                process.env.TOKEN_SECRET + ""
            );
            res.json({ idToken: token });
        }
    } catch (error) {
        res.status(401);
        res.json({ error });
    }
};

const authorized = async (req: Request, res: Response) => {
    res.status(200).send({
        message: "User Authorized"
    });
};

export default {
    create,
    read,
    remove,
    index,
    login,
    authorized
};
