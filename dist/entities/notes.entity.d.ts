import { User } from "./auth.entity";
export declare class Notes {
    id: number;
    user: User;
    title: string;
    description: string;
    tag: string;
    created_at: Date;
}
