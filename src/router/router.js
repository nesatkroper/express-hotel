const express = require("express");
const expressListEndpoints = require("express-list-endpoints");
const router = express.Router();

// ! import router
const gmailOtpRouter = require("@/router/components/gmail-otp-router");
const authRouter = require("@/router/components/auth-router");
const userRouter = require("@/router/components/user-router");
const postRouter = require("@/router/components/post-router");
const positionRouter = require("@/router/components/position-router");
const departmentRouter = require("@/router/components/department-router");
const categoryRouter = require("@/router/components/category-router");
const bankNoteRouter = require("@/router/components/banknote-router");
const employeeRouter = require("@/router/components/employee-router");
const customerRouter = require("@/router/components/customer-router");
const closeRouter = require("@/router/components/close-router");
const openRouter = require("@/router/components/open-router");
const productRouter = require("@/router/components/product-router");
const supplierRouter = require("@/router/components/supplier-router");
const stockRouter = require("@/router/components/stock-router");
const reservationRouter = require("@/router/components/reservation-router");
const reserveDetailsRouter = require("@/router/components/reservation-details-router");
const roomPictureRouter = require("@/router/components/room-picture-router");
const roomRouter = require("@/router/components/room-router");
const saleRouter = require("@/router/components/sale-router");
const saleDetailRouter = require("@/router/components/sale-detail-router");
const KHQRRouter = require("@/router/components/khqr-router");

//  ! router
router.use("/uploads", express.static("uploads"));
router.use("/mail", gmailOtpRouter);
router.use("/", authRouter);
router.use("/auth", userRouter);
router.use("/post", postRouter);
router.use("/position", positionRouter);
router.use("/department", departmentRouter);
router.use("/category", categoryRouter);
router.use("/banknote", bankNoteRouter);
router.use("/employee", employeeRouter);
router.use("/customer", customerRouter);
router.use("/close", closeRouter);
router.use("/open", openRouter);
router.use("/product", productRouter);
router.use("/supplier", supplierRouter);
router.use("/stock", stockRouter);
router.use("/reservation", reservationRouter);
router.use("/reserve-details", reserveDetailsRouter);
router.use("/room", roomRouter);
router.use("/room-picture", roomPictureRouter);
router.use("/sale-detail", saleDetailRouter);
router.use("/sale", saleRouter);
router.use("/khqr", KHQRRouter);

const fetch = require("node-fetch");

router.get("/tele", async (req, res) => {
  const { msg } = req.query;
  const token = process.env.TOKEN;
  const channel = process.env.CHANNEL;

  if (!msg) {
    return res
      .status(400)
      .json({ success: false, error: "Message is required" });
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${channel}&text=${encodeURIComponent(
    msg
  )}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true, telegramResponse: result });
    } else {
      res.status(400).json({ success: false, error: result });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/rl", (req, res) => {
  res.json(expressListEndpoints(router));
});

module.exports = router;

// const express = require("express");
// const fetch = require("node-fetch");
// const router = express.Router();

// const MAX_RETRIES = 3;
// const RETRY_DELAY = 1000; // 1 second between retries

// const sendTelegramMessage = async (url, retries = 0) => {
//   try {
//     const response = await fetch(url);
//     const result = await response.json();

//     if (response.ok) {
//       return { success: true, result };
//     } else {
//       throw new Error(result.description || "Failed to send message");
//     }
//   } catch (error) {
//     if (retries < MAX_RETRIES) {
//       console.log(`Retrying... Attempt ${retries + 1}`);
//       await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
//       return sendTelegramMessage(url, retries + 1);
//     } else {
//       return { success: false, error: error.message };
//     }
//   }
// };

// router.post("/tele", async (req, res) => {
//   const { msg } = req.body;
//   if (!msg) {
//     return res.status(400).json({ error: "Message (msg) is required" });
//   }

//   const token = process.env.TOKEN;
//   const channel = process.env.CHANNEL;
//   const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${channel}&text=${encodeURIComponent(
//     msg
//   )}`;

//   const result = await sendTelegramMessage(url);

//   if (result.success) {
//     res.status(200).json({ success: true, telegramResponse: result.result });
//   } else {
//     res.status(500).json({ success: false, error: result.error });
//   }
// });

// module.exports = router;
