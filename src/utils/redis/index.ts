import Redis, { RedisOptions } from "ioredis";

const options: RedisOptions = {

    retryStrategy: function (times: number) {
        if (times < 3) {
            return 60000;
        }
        return null;
    },
    maxRetriesPerRequest: null
}

const redisClient = new Redis(process.env.REDIS_URL!);
const pubSubClient = new Redis(process.env.REDIS_URL!, options);

redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

pubSubClient.on('error', (err) => {
    console.error('Redis Pub/Sub client error:', err);
});


export { redisClient, pubSubClient } 
