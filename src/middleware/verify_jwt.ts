import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const token_generator = (username: string, user_id: string) => {
    const access_Token: string = jwt.sign(
        {
            user: username, 
            userID: user_id,
        }, 
        process.env.TOKEN_SECRET as string,
        {expiresIn: process.env.TOKEN_EXPIRES as string}
    )
    return access_Token;
};

const token_authenticator = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    } catch (err) {
        res.status(401).send("Invalid Token: " + err);
    }
};

export default {
    token_generator,
    token_authenticator
}
