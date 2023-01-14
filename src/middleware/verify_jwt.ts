import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";

const token_authenticator = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    }catch (err){
        res.status(401).send("Invalid Token: " + err);
    }
}

export default token_authenticator;