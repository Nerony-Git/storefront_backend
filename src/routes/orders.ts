import { Application } from "express";
import token_authenticator from "../middleware/verify_jwt";
import * as order_handler from "../handlers/order";

const order_routes = (app: Application) => {
    app.get("/orders", token_authenticator, order_handler.default.index);
    app.get("/orders/:id", token_authenticator, order_handler.default.read);
    app.post("/orders", token_authenticator, order_handler.default.create);
    app.delete(
        "/orders/:id",
        token_authenticator,
        order_handler.default.remove
    );
};

export default order_routes;
