import { Application } from "express";
import token_authenticator from "../middleware/verify_jwt";
import addProduct from "../handlers/order_product";

const order_product_route = (app: Application) => {
    app.post("/orders/products/add", token_authenticator, addProduct)
};


export default order_product_route;