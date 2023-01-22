import { Application } from "express";
import * as token_process from "../middleware/verify_jwt";
import * as order_product_handler from "../handlers/order_product";

const order_product_route = (app: Application) => {
    app.post("/orders/products/add", token_process.default.token_authenticator, order_product_handler.default.addProduct);
    app.delete("/orders/products/:id", token_process.default.token_authenticator, order_product_handler.default.remove);
};

export default order_product_route;
