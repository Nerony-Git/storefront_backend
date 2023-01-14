import { Application } from "express";
import token_authenticator from "../middleware/verify_jwt";
import * as user_details_handler from "../handlers/user_detail";

const user_routes = (app: Application) => {
    app.get("/users", token_authenticator, user_details_handler.default.index);
    app.get("/users/:id", token_authenticator, user_details_handler.default.read);
    app.get("/user/decoded", token_authenticator, user_details_handler.default.token_decoded)
    app.post("/signin", user_details_handler.default.login);
    app.post("/signup", user_details_handler.default.create);
    
};


export default user_routes;