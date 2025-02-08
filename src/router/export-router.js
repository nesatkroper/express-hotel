//! finance
const bankNoteRouter = require("@/router/components/finance/banknote-router");
const closeRouter = require("@/router/components/finance/close-router");
const KHQRRouter = require("@/router/components/finance/khqr-router");
const openRouter = require("@/router/components/finance/open-router");

//! human-resource
const authRouter = require("@/router/components/human-resource/auth-router");
const customerRouter = require("@/router/components/human-resource/customer-router");
const departmentRouter = require("@/router/components/human-resource/department-router");
const employeeRouter = require("@/router/components/human-resource/employee-router");
const positionRouter = require("@/router/components/human-resource/position-router");
const userRouter = require("@/router/components/human-resource/user-router");

//! notification
const telegramAttendanceRouter = require("@/router/components/notification/telegram-attendance-router");
const telegramNotificationRouter = require("@/router/components/notification/telegram-notification-router");

//! product
const categoryRouter = require("@/router/components/product/category-router");
const productRouter = require("@/router/components/product/product-router");
const stockRouter = require("@/router/components/product/stock-router");
const supplierRouter = require("@/router/components/product/supplier-router");

//! reservation
const reserveDetailsRouter = require("@/router/components/reservation/reservation-details-router");
const reservationRouter = require("@/router/components/reservation/reservation-router");
const roomPictureRouter = require("@/router/components/reservation/room-picture-router");
const roomRouter = require("@/router/components/reservation/room-router");

//! sale
const saleDetailRouter = require("@/router/components/sale/sale-detail-router");
const saleRouter = require("@/router/components/sale/sale-router");

//!
const gmailOtpRouter = require("@/router/components/gmail-otp-router");

module.exports = {
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
};
