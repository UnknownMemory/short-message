export interface Post {
    id?: number
    text: string,
    authorID: number,
    created_at: Date,
    isLiked: number | null
    likes: number
}
