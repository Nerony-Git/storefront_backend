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
            const conn = await client.connect();
            const sql = "INSERT INTO user_details (user_id, first_name, last_name, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";
            const hash = bcrypt.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string));
            const result = await conn.query(sql, [u.user_id, u.first_name, u.last_name, u.username, hash]);
            const user = result.rows[0];
            conn.release();

            return user;
        }catch (error){
            throw new Error("Unable to create user " + u.username + " because, " + error);
        }
    }

    async read(uid: string): Promise<User> {
        try{
            const conn = await client.connect();
            const sql = "SELECT * FROM user_details WHERE sn = $1";
            const result = await conn.query(sql, [uid]);
            conn.release();

            return result.rows[0];
        }catch (error){
            throw new Error ("Failed to load user with ID: " + uid + " because, " + error);
        }
    }

    async update(u: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = "UPDATE user_details SET first_name = $1, last_name = $2, username = $3, password = $4 WHERE sn = $5 RETURNING *";
            const hash = bcrypt.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string));
            const result = await conn.query(sql, [u.first_name, u.last_name, u.username, hash, u.sn]);
            const user = result.rows[0];
            conn.release();

            return user;
        }catch (error){
            throw new Error ("Failed to update details of user with username: " + u.username + " because, " + error);
        }
    }

    async delete(uid: string): Promise<User> {
        try{
            const conn = await client.connect();
            const sql = "DELETE FROM user_details WHERE sn = $1";
            const result = await conn.query(sql, [uid]);
            const user = result.rows[0];
            conn.release();

            return user;
        }catch (error){
            throw new Error("User with ID: " + uid + " can't be deleted because, " + error);
        }
    }
    
    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await client.connect();
        const sql = "SELECT password FROM user_details WHERE username = $1";
        const result = await conn.query(sql, [username]);
        conn.release();

        if (result.rows.length){
            const user = result.rows[0]
            console.log(user);

            if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)){
                return user;
            }
        }

        return null;
    }
}