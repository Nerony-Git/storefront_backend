import supertest from "supertest";
import app from "../server";
import * as token_process from "../middleware/verify_jwt";
import exp from "constants";

const request: supertest.SuperTest<supertest.Test> = supertest(app);
const testAccount = {
    username: "Admin",
    userID: "STORE_0031"
};

const token = token_process.default.token_generator(testAccount.username, testAccount.userID);
const test_token = "Bearer " + token;


describe("Testing User Details Handler.", (): void => {
    describe("Testing valid arguments:", (): void => {
        it("Create a User.", async (): Promise<void> => {
            const response: supertest.Response = await request.post("/signup").send({
                "user_id": "STORE_0031",
                "first_name": "Test",
                "last_name": "Account",
                "username": "Admin",
                "password": "root@123"
            });

            expect(response.status).toBe(200);
        });

        it("Authorize User.", async (): Promise<void> => {
            const response = await request.get("/users/authorize").set(
                "Authorization", test_token
            );

            expect(response.status).toBe(200);
        });

        it("Show a specific User.", async (): Promise<void> => {
            const response: supertest.Response = await request.get("/users/STORE_0031").set(
                "Authorization", test_token
            );

            expect(response.status).toBe(200);
        });

        it("Show All Users.", async (): Promise<void> => {
            const response: supertest.Response = await request.get("/users").set(
                "Authorization", test_token
            );

            expect(response.status).toBe(200);
        });

        it("Login User.", async (): Promise<void> => {
            const response: supertest.Response = await request.post("/signin").send({
                "username": "Admin",
                "password": "root@123"
            });

            expect(response.status).toBe(200);
        });

    });
});

describe("Testing Product details Handler.", (): void => {
    describe("Testing valid arguments:", (): void => {
        it("Create a Product.", async (): Promise<void> => {
            const response: supertest.Response = await request.post("/products").send({
                "product_id": "10342",
                "product_name": "Avocado Oil (1L)",
                "product_price": 15,
                "product_category": "Grocery"
            }).set("Authorization", test_token);

            expect(response.status).toBe(200);
        });

        it("Select a specific product.", async (): Promise<void> => {
            const response: supertest.Response = await request.get("/products/10342").set("Authorization", test_token);

            expect(response.status).toBe(200);
        });

        it("List all products.", async (): Promise<void> => {
            const response: supertest.Response = await request.get("/products");

            expect(response.status).toBe(200);
        });

        it("Update details of a specific product.", async (): Promise<void> => {
            const response: supertest.Response = await request.put("/products/10342").send({
                "product_name": "Avocado Oil (1L)",
                "product_price": 20,
                "product_category": "Grocery"
            }).set("Authorization", test_token);

            expect(response.status).toBe(200);
        });

    });
});

describe("Testing Orders Handler.", (): void => {
    describe("Testing valid arguments:", (): void => {
        it("Create an Order.", async (): Promise<void> => {
            const response: supertest.Response = await request.post("/orders").send({
                "user_id": "1",
                "status": "Active"
            }).set("Authorization", test_token);

            expect(response.status).toBe(200);
        });
        
        it("Add order to order_product.", async (): Promise<void> => {
            const response: supertest.Response = await request.post("/orders/products/add").send({
                "order_id": "1",
                "product_id": "1",
                "quantity": "20"
            }).set("Authorization", test_token);

            expect(response.status).toBe(200);
        });

        it("Select a specific order.", async (): Promise<void> => {
            const response: supertest.Response = await request.get("/orders/1").set("Authorization", test_token);

            expect(response.status).toBe(200);
        });

        it("List all orders.", async (): Promise<void> => {
            const response: supertest.Response = await request.get("/orders").set("Authorization", test_token);

            expect(response.status).toBe(200);
        });
    });
});

describe("Deleting Data Entries.", (): void => {
    describe("Testing valid arguments:", (): void => {
        it("Delete User Details.", async () => {
            const response: supertest.Response = await request.delete("/users/STORE_0031").set("Authorization", test_token);

            expect(response.status).toBe(200);
        });

        it("Delete Order_Product Details.", async () => {
            const response: supertest.Response = await request.delete("/orders/products/1").set("Authorization", test_token);

            expect(response.status).toBe(200);
        });

        it("Delete Product Details.", async () => {
            const response: supertest.Response = await request.delete("/products/10342").set("Authorization", test_token);

            expect(response.status).toBe(200);
        });

        it("Delete Order", async () => {
            const response: supertest.Response = await request.delete("/orders/1").set("Authorization", test_token);

            expect(response.status).toBe(200);
        });
    });
});