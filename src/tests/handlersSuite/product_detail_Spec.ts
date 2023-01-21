import supertest from "supertest";
import app from "../../server";
import * as token_process from "../../middleware/verify_jwt";

const request: supertest.SuperTest<supertest.Test> = supertest(app);
const testAccount = {
    username: "Admin",
    userID: "STORE_0031"
};

const token = token_process.default.token_generator(testAccount.username, testAccount.userID);
const test_token = "Bearer " + token;

describe("Testing Product details Handler", (): void => {
    describe("Testing valid arguments:", (): void => {
        it("Create a Product", async (): Promise<void> => {
            const response: supertest.Response = await request.post("/products").send({
                "product_id": "10342",
                "product_name": "Avocado Oil (1L)",
                "product_price": 15,
                "product_category": "Grocery"
            }).set("Authorization", test_token);
            expect(response.status).toBe(200);
        });

        it("List all products", async (): Promise<void> => {
            const response: supertest.Response = await request.get("/products");
            expect(response.status).toBe(200);
        });

        it("Select a specific product.", async (): Promise<void> => {
            const response: supertest.Response = await request.get("/products/10342").set("Authorization", test_token);
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