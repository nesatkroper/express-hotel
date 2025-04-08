const allowedOrigins = [
    "https://react-hotel-two.vercel.app",
    "https://nun.up.railway.app",
    "http://localhost:5173",
];

const allowedHeaders = [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
];

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"];

const transports = ["websocket", "polling"];

module.exports = { allowedOrigins, allowedHeaders, methods, transports }