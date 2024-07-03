interface User {
    id?: number
    username: string,
    email?: string,
    password?: string,
    display_name: string,
    image: string | null,
    description: string | null,
    is_admin?: boolean | null,
    created_at?: Date
}
