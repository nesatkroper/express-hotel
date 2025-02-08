const express = require("express");
const expressListEndpoints = require("express-list-endpoints");
const router = express.Router();
const authenticateJWT = require("@/middleware/auth-middleware");

const {
  gmailOtpRouter,
  authRouter,
  userRouter,
  positionRouter,
  departmentRouter,
  categoryRouter,
  bankNoteRouter,
  employeeRouter,
  customerRouter,
  closeRouter,
  openRouter,
  productRouter,
  supplierRouter,
  stockRouter,
  reservationRouter,
  reserveDetailsRouter,
  roomPictureRouter,
  roomRouter,
  saleRouter,
  saleDetailRouter,
  KHQRRouter,
  telegramNotificationRouter,
  telegramAttendanceRouter,
} = require("@/router/export-router");

//  ! router
router.use("/", authRouter);
router.use("/uploads", express.static("uploads"));
router.use("/mail", gmailOtpRouter);
router.use("/auth", userRouter);
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
router.use("/tele-noti", telegramNotificationRouter);
router.use("/tele-att", telegramAttendanceRouter);

router.get("/rl", (req, res) => {
  res.json(expressListEndpoints(router));
});

module.exports = router;
