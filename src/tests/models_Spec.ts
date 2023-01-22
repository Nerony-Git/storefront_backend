import { UserStore } from "../models/user_detail";
import { ProductStore } from "../models/product_detail";


const user_store = new UserStore();
const product_store = new ProductStore();

describe("Testing User Details Model.", (): void => {
    describe("Testing valid arguments:", (): void => {
        it("Signup a User.", async (): Promise<void> => {
            const results = await user_store.create({
                user_id: "STORE_0032",
                first_name: "Dummy",
                last_name: "Account",
                username: "Admin2",
                password: "root@123"
            });

            expect(results).toBeDefined;
        });

        it("Login a User.", async (): Promise<void> => {
            const username = "Admin2";
            const password = "root@123";
            const results = await user_store.authenticate(username, password);

            expect(results).toBeDefined;
        });

        it("Select a specific User.", async (): Promise<void> => {
            const uid = "STORE_0032";
            const results = await user_store.read(uid);

            expect(results).toBeDefined;
        });

        it("List all users.", async (): Promise<void> => {
            const results = await user_store.index();

            expect(results).toBeDefined;
        });
    });
});

describe("Testing Product Details Model.", (): void => {
    describe("Testing valid arguments:", (): void =>{
        it("Create a new product", async (): Promise<void> => {
            const result = await product_store.create({
                product_id: "10768",
                product_name: "Pespsi Max",
                product_price: 39,
                product_category: "Drinks"
            });

            expect(result).toBeDefined;
        });

        it("Select a specific product.", async (): Promise<void> => {
            const pid = 10768;
            const results = await product_store.read(pid);

            expect(results).toBeDefined;
        });

        it("List all products.", async (): Promise<void> => {
            const results = await product_store.index();

            expect(results).toBeDefined;
        });

        it("Update details of product.", async (): Promise<void> => {
            const pid = 10768;
            const results = await product_store.update(pid, {
                product_name: "Pepsi Max",
                product_price: 23,
                product_category: "Drinks"
            });

            expect(results).toBeDefined;
            expect(results.product_price).toEqual(23);
        });
    });
});