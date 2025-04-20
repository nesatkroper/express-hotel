const { createClient } = require("redis");

/**
 * Creates a Redis client with the specified configuration options.
 * @param {object} options - The options object for creating the Redis client.
 * @param {string} options.url - The URL of the Redis server.
 * @param {object} options.socket - The socket configuration object.
 * @param {function} options.socket.reconnectStrategy - The function that determines the reconnect strategy based on the number of retries.
 * @returns A Redis client connected to the specified Redis server.
 */
const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 5) {
        console.log("Too many Redis connection attempts");
        return false;
      }
      return Math.min(retries * 200, 2000);
    },
  },
});

redisClient.on("error", (err) => {
  if (err.message.includes("WRONGPASS")) {
    console.error("❌ Redis authentication failed - check your password");
  } else {
    console.error("Redis error:", err.message);
  }
});

(async () => {
  try {
    await redisClient.connect();
    console.log("✅ Redis connected");
  } catch (err) {
    console.error("❌ Redis connection failed:", err.message);
  }
})();

module.exports = { redisClient };
