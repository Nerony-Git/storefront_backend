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
}