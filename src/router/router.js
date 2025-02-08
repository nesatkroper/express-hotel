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

router.get("/rl", (req, res) => {
  res.json(expressListEndpoints(router));
});

module.exports = router;
