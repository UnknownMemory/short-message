import Redis from "ioredis";

import { redisClient } from "../redis";
import { RateLimiterType } from "@/types/RateLimiter";


export class RateLimiter implements RateLimiterType {
    private limit: number
    private size: number
    private redis: Redis

    constructor(limit: number, size: number) {
        this.limit = limit
        this.size = size
        this.redis = redisClient
    }

    public async allow(key: string): Promise<boolean> {
        try {
            const now = new Date()
            const nowMs = now.getTime()

            await this.redis.watch(key);
            const currentWindow = await this.updateWindows(now, await this.redis.hgetall(key))

            const timeElapsed = nowMs - currentWindow["start"]
            const weight = (this.size - timeElapsed) / this.size
            const limitApproximation = Math.floor((weight * currentWindow["prevCount"]) + currentWindow["currCount"])

            if (limitApproximation < this.limit) {
                const multi = this.redis.multi();
                multi.hset(key, {
                    "start": currentWindow['start'].toString(),
                    "currCount": currentWindow['currCount'] + 1,
                    "prevCount": currentWindow['prevCount']
                })
                await multi.exec()
                return true
            }

            return false
        } catch (err) {
            console.error(`Rate limiter failure: ${err}`)
            return false
        }

    }

    private truncate(date: number): Date {
        return new Date(Math.floor(date / this.size) * this.size)
    }

    private updateWindows(now: Date, win: Record<string, string>): Record<string, any> {
        const current = this.truncate(now.getTime())
        const currentWindowStart = Number(win['start'])

        if (current.getTime() != currentWindowStart) {
            let prevWinCount = 0

            if ((current.getTime() - currentWindowStart) === this.size) {
                prevWinCount = Number(win["currCount"])
            }

            return {
                "start": current.getTime(),
                "currCount": 0,
                "prevCount": prevWinCount
            }
        }

        return {
            "start": Number(win['start']),
            "currCount": Number(win["currCount"]),
            "prevCount": Number(win["prevCount"])
        }
    }
}
