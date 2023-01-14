import { type } from "os";
import client from "../database";

export type Order = {
    sn?: number;
    user_id: string;
    status: string
};

export class OrderStore {
    
}