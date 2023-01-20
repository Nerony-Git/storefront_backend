import { Application } from "express";
import * as token_process from "../middleware/verify_jwt";
import * as order_handler from "../handlers/order";

const order_routes = (app: Application) => {
    app.get("/orders", token_process.default.token_authenticator, order_handler.default.index);
    app.get("/orders/:id", token_process.default.token_authenticator, order_handler.default.read);
    app.post("/orders", token_process.default.token_authenticator, order_handler.default.create);
    app.delete(
        "/orders/:id",
        token_process.default.token_authenticator,
        order_handler.default.remove
    );
};

export default order_routes;
