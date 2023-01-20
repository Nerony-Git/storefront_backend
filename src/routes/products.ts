import { Application } from "express";
import * as token_process from "../middleware/verify_jwt";
import * as product_detail_handler from "../handlers/product_detail";

const products_routes = (app: Application) => {
    app.get("/products", product_detail_handler.default.index);
    app.get("/products/:id", product_detail_handler.default.read);
    app.post(
        "/products",
        token_process.default.token_authenticator,
        product_detail_handler.default.create
    );
    app.put(
        "/products/:id",
        token_process.default.token_authenticator,
        product_detail_handler.default.update
    );
    app.delete(
        "/products/:id",
        token_process.default.token_authenticator,
        product_detail_handler.default.remove
    );
};

export default products_routes;
