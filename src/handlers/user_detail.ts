import {Request, Response} from "express";
import token_authenticator from "../middleware/verify_jwt";
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
            {name: new_user.first_name + " " + new_user.last_name}, process.env.TOKEN_SECRET+"");
            res.json({idToken:token});
    }catch (error) {
        res.status(400);
        res.json({error })
    }
};

const read = async (req: Request, res: Response) => {
    try {
        const user = await store.read(req.params.sn);
        res.json(user);
    }catch (error){
        res.status(400);
        res.json(error);
    }
};
