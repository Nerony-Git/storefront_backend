import { Application } from "express";
import * as token_process from "../middleware/verify_jwt";
import * as user_details_handler from "../handlers/user_detail";

const user_routes = (app: Application) => {
    app.get(
        "/users",
        token_process.default.token_authenticator,
        user_details_handler.default.index
    );
    app.get(
        "/users/:id",
        token_process.default.token_authenticator,
        user_details_handler.default.read
    );
    app.get(
        "/users/authorize",
        token_process.default.token_authenticator,
        user_details_handler.default.authorized
    );
    app.post("/signin", user_details_handler.default.login);
    app.post("/signup", user_details_handler.default.create);
    app.delete(
        "/users/:id",
        token_process.default.token_authenticator,
        user_details_handler.default.remove
    );
};

export default user_routes;
