// const prisma = require("@/provider/client");
// const morgan = require("morgan");

// const logToDB = async (
//   auth_id,
//   method,
//   url,
//   status,
//   response_time,
//   ip,
//   user_agent
// ) => {
//   try {
//     await prisma.authLog.create({
//       data: {
//         auth_id,
//         method,
//         url,
//         status,
//         response_time,
//         ip,
//         user_agent,
//       },
//     });
//   } catch (error) {
//     console.error("Error saving log:", error);
//   }
// };

// morgan.token(
//   "response-time-ms",
//   (req, res) => res.get("X-Response-Time") || "0"
// );

// const dbLogger = morgan(async (tokens, req, res) => {
//   const method = tokens.method(req, res);
//   const url = tokens.url(req, res);
//   const status = parseInt(tokens.status(req, res), 10);
//   const response_time = parseFloat(tokens["response-time-ms"](req, res));
//   const ip = req.ip;
//   const user_agent = req.headers["user-agent"] || "";

//   let auth_id = null;

//   if ((url === "/v1/login" || url === "/v1/logout") && method === "POST") {
//     const { email } = req.body;
//     if (email) {
//       const authUser = await prisma.auth.findUnique({
//         where: { email },
//         select: { auth_id: true },
//       });

//       if (authUser) auth_id = authUser.auth_id;
//     }
//   } else if (req.user) {
//     auth_id = req.user.auth_id;
//   }

//   if (auth_id) {
//     logToDB(auth_id, method, url, status, response_time, ip, user_agent);
//   }

//   return null;
// });

// module.exports = dbLogger;
const prisma = require("@/provider/client");
const morgan = require("morgan");

const logToDB = async (
  auth_id,
  method,
  url,
  status,
  response_time,
  ip,
  user_agent
) => {
  try {
    await prisma.authLog.create({
      data: {
        auth_id,
        method,
        url,
        status,
        response_time,
        ip,
        user_agent,
      },
    });
  } catch (error) {
    console.error("Error saving log:", error);
  }
};

morgan.token(
  "response-time-ms",
  (req, res) => res.get("X-Response-Time") || "0"
);

const dbLogger = morgan((tokens, req, res) => {
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const status = parseInt(tokens.status(req, res), 10);
  const response_time = parseFloat(tokens["response-time-ms"](req, res));
  const ip = req.ip;
  const user_agent = req.headers["user-agent"] || "";

  let auth_id = null;

  if (url === "/v1/login" && method === "POST") {
    // Login: Get auth_id from email
    const { email } = req.body;
    if (email) {
      prisma.auth
        .findUnique({
          where: { email },
          select: { auth_id: true },
        })
        .then((authUser) => {
          if (authUser) {
            logToDB(
              authUser.auth_id,
              method,
              url,
              status,
              response_time,
              ip,
              user_agent
            );
          }
        })
        .catch((error) => console.error("Error fetching auth_id:", error));
    }
  } else if (url === "/v1/logout" && method === "POST") {
    // Logout: Ensure req.user is set
    if (req.user && req.user.auth_id) {
      auth_id = req.user.auth_id;
      logToDB(auth_id, method, url, status, response_time, ip, user_agent);
    } else {
      console.error("Logout request made but req.user is missing!");
    }
  }

  return null; // Ensure Morgan does not expect a Promise
});

module.exports = dbLogger;
