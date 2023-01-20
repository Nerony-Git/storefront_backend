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


describe("Testing User Details Handler", (): void => {
    describe("Testing valid arguments", (): void => {
        it("Create a User", async (): Promise<void> => {
            const response: supertest.Response = await request.post("/signup").send({
                "user_id": "STORE_0031",
                "first_name": "Test",
                "last_name": "Account",
                "username": "Admin",
                "password": "root@123"
            });

            expect(response.status).toBe(200);
        });

        it("Authorize User", async (): Promise<void> => {
            const response = await request.get("/users/authorize").set(
                "Authorization", test_token
            );

            expect(response.status).toBe(200);
        });

        it("Show a specific User", async (): Promise<void> => {
            const response: supertest.Response = await request.get("/users/STORE_0031").set(
                "Authorization", test_token
            );

            expect(response.status).toBe(200);
        });

        it("Show All Users", async (): Promise<void> => {
            const response: supertest.Response = await request.get("/users").set(
                "Authorization", test_token
            );

            expect(response.status).toBe(200);
        });

        it("Login User", async (): Promise<void> => {
            const response: supertest.Response = await request.post("/signin").send({
                "username": "Admin",
                "password": "root@123"
            });

            expect(response.status).toBe(200);
        });

    });
});