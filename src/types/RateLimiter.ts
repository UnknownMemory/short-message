export interface RateLimiterType {
    allow(key: string): Promise<boolean>
}
