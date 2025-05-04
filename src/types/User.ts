import { JWTPayload } from "jose"

export interface User {
    id: number
    username: string,
    email?: string,
    password?: string,
    display_name: string,
    image: string | null,
    description: string | null,
    is_admin?: boolean | null,
    created_at?: Date
}

export interface UserJWTPayload extends JWTPayload {
    id: string,
    username: string
}

declare module "jose" {
    export interface JWTPayload {
        id: string,
        username: string
    }
}
