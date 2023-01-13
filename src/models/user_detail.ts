import { type } from "os";
import client from "../database";
import bcrypt from "bcrypt";

const { BCRYPT_PASSWORD, SALT_ROUNDS} = process.env;

export type User = {
    sn?: number;
    user_id: string;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}

export class UserStore {
    async create(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "INSERT INTO user_details (user_id, first_name, last_name, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";
            const hash = bcrypt.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string));
            const result = await conn.query(sql, [u.user_id, u.first_name, u.last_name, u.username, hash]);
            const user = result.rows[0];

            return user;
        }catch (error){
            throw new Error("Unable to create user " + u.username + " because, " + error);
        }
    }
    
    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await client.connect();
        const sql = "SELECT * FROM user_details WHERE username=$1";
        const result = await conn.query(sql, [username]);

        return null
    }
}