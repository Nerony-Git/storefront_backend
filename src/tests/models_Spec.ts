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
