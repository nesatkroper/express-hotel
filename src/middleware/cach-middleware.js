const redis = require("redis");
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.on("error", (err) => console.log("Redis Error:", err));
redisClient.connect().then(() => console.log("Redis connected"));

/**
 * Middleware function to cache responses for a specified time-to-live (TTL) duration.
 * @param {number} [ttl=3600] - Time-to-live duration in seconds for caching the response.
 * @returns {Function} Express middleware function that caches responses and serves cached data if available.
 */
module.exports = (ttl = 3600) => {
  return async (req, res, next) => {
    const cacheKey = `cache:${req.originalUrl}`;
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.json(JSON.parse(cachedData));
      }
      const originalJson = res.json;
      res.json = async (data) => {
        await redisClient.setEx(cacheKey, ttl, JSON.stringify(data));
        console.log(`Cached ${cacheKey} for ${ttl}s`);
        originalJson.call(res, data);
      };
      next();
    } catch (err) {
      console.error("Cache error:", err);
      next();
    }
  };
};
