import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import order_product_route from "./routes/order_products";
import order_routes from "./routes/orders";
import products_routes from "./routes/products";
import user_routes from "./routes/users";

const app: express.Application = express();
const address = "http://localhost:3000";

app.use(bodyParser.json());

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
order_product_route(app);
order_routes(app);
products_routes(app);
user_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

export default app;
