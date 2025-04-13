-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('active', 'dormant', 'suspended');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'others');

-- CreateEnum
CREATE TYPE "ReservationType" AS ENUM ('booked', 'reserve');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('paid', 'pending', 'cancel');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cash', 'creditCard', 'khqr', 'leave');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "State" (
    "stateId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("stateId")
);

-- CreateTable
CREATE TABLE "City" (
    "cityId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stateId" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("cityId")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Auth" (
    "authId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "roleId" UUID NOT NULL,
    "employeeId" UUID,
    "customerId" UUID,
    "status" "AccountStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("authId")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendanceId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employeeId" UUID NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendanceId")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employeeId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employeeCode" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'male',
    "dob" TIMESTAMP(3),
    "phone" TEXT,
    "positionId" UUID NOT NULL,
    "departmentId" UUID NOT NULL,
    "salary" DECIMAL(10,2) NOT NULL,
    "hiredDate" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "Employeeinfo" (
    "employeeinfoId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employeeId" UUID NOT NULL,
    "picture" TEXT,
    "region" TEXT,
    "email" TEXT,
    "address" TEXT,
    "cityId" UUID NOT NULL,
    "stateId" UUID NOT NULL,
    "country" TEXT,
    "note" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',

    CONSTRAINT "Employeeinfo_pkey" PRIMARY KEY ("employeeinfoId")
);

-- CreateTable
CREATE TABLE "Department" (
    "departmentId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "departmentName" TEXT,
    "departmentCode" TEXT,
    "memo" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("departmentId")
);

-- CreateTable
CREATE TABLE "Position" (
    "positionId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "departmentId" UUID NOT NULL,
    "positionName" TEXT,
    "positionCode" TEXT,
    "memo" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("positionId")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "picture" TEXT,
    "gender" "Gender" NOT NULL DEFAULT 'male',
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "cityId" UUID NOT NULL,
    "stateId" UUID NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Reservedetail" (
    "reservedetailId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roomId" UUID NOT NULL,
    "employeeId" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "reservationId" UUID NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "night" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',

    CONSTRAINT "Reservedetail_pkey" PRIMARY KEY ("reservedetailId")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservationId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "checkinDate" TIMESTAMP(3) NOT NULL,
    "checkoutDate" TIMESTAMP(3) NOT NULL,
    "isCheckin" BOOLEAN NOT NULL,
    "isCheckout" BOOLEAN NOT NULL,
    "reservationType" "ReservationType" NOT NULL DEFAULT 'reserve',
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'paid',
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'cash',
    "memo" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservationId")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "typeId" UUID NOT NULL,
    "roomName" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "isAc" BOOLEAN NOT NULL DEFAULT true,
    "capacity" INTEGER NOT NULL DEFAULT 4,
    "size" INTEGER NOT NULL DEFAULT 25,
    "discountRate" INTEGER NOT NULL DEFAULT 0,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Roomtype" (
    "typeId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',

    CONSTRAINT "Roomtype_pkey" PRIMARY KEY ("typeId")
);

-- CreateTable
CREATE TABLE "Roompicture" (
    "roompictureId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roomId" UUID NOT NULL,
    "picture" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roompicture_pkey" PRIMARY KEY ("roompictureId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productName" TEXT NOT NULL,
    "productCode" TEXT,
    "categoryId" UUID NOT NULL,
    "picture" TEXT,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "discountRate" INTEGER NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "picture" TEXT,
    "categoryName" TEXT NOT NULL,
    "categoryCode" TEXT,
    "memo" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Cart" (
    "cartId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "authId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cartId")
);

-- CreateTable
CREATE TABLE "Cartnote" (
    "cartnoteId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cartId" UUID NOT NULL,
    "note" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',

    CONSTRAINT "Cartnote_pkey" PRIMARY KEY ("cartnoteId")
);

-- CreateTable
CREATE TABLE "Productstock" (
    "productstockId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "supplierId" UUID NOT NULL,
    "invNumber" TEXT,
    "productAdd" INTEGER NOT NULL DEFAULT 0,
    "addPrice" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "addDate" TIMESTAMP(3),
    "memo" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Productstock_pkey" PRIMARY KEY ("productstockId")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "supplierId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "supplierName" TEXT NOT NULL,
    "companyName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplierId")
);

-- CreateTable
CREATE TABLE "Sale" (
    "saleId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employeeId" UUID NOT NULL,
    "roomId" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("saleId")
);

-- CreateTable
CREATE TABLE "Saledetail" (
    "saledetailId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "saleId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Saledetail_pkey" PRIMARY KEY ("saledetailId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employeeId" UUID NOT NULL,
    "saleId" UUID NOT NULL,
    "reservationId" UUID NOT NULL,
    "invoice" TEXT,
    "hash" TEXT NOT NULL,
    "fromAccountId" TEXT NOT NULL,
    "toAccountId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "externalRef" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "Shift" (
    "shiftId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employeeId" UUID NOT NULL,
    "shiftCode" TEXT NOT NULL,
    "openKhmerRiel" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "openUsDollar" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "openTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closeKhmerRiel" DECIMAL(12,2) DEFAULT 0.00,
    "closeUsDollar" DECIMAL(12,2) DEFAULT 0.00,
    "closeTime" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("shiftId")
);

-- CreateTable
CREATE TABLE "Banknote" (
    "banknoteId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "shiftId" UUID NOT NULL,
    "khmer100" INTEGER DEFAULT 0,
    "khmer500" INTEGER DEFAULT 0,
    "khmer1K" INTEGER DEFAULT 0,
    "khmer2K" INTEGER DEFAULT 0,
    "khmer5K" INTEGER DEFAULT 0,
    "khmer10K" INTEGER DEFAULT 0,
    "khmer15K" INTEGER DEFAULT 0,
    "khmer20K" INTEGER DEFAULT 0,
    "khmer30K" INTEGER DEFAULT 0,
    "khmer50K" INTEGER DEFAULT 0,
    "khmer100K" INTEGER DEFAULT 0,
    "khmer200K" INTEGER DEFAULT 0,
    "us1" INTEGER DEFAULT 0,
    "us5" INTEGER DEFAULT 0,
    "us10" INTEGER DEFAULT 0,
    "us20" INTEGER DEFAULT 0,
    "us50" INTEGER DEFAULT 0,
    "us100" INTEGER DEFAULT 0,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banknote_pkey" PRIMARY KEY ("banknoteId")
);

-- CreateTable
CREATE TABLE "Groupmessage" (
    "groupmessageId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employeeId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Groupmessage_pkey" PRIMARY KEY ("groupmessageId")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "responseTime" DOUBLE PRECISION NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "authId" UUID NOT NULL,
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "responseTime" DOUBLE PRECISION NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_stateId_key" ON "City"("name", "stateId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_employeeId_key" ON "Auth"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_customerId_key" ON "Auth"("customerId");

-- CreateIndex
CREATE INDEX "Auth_email_idx" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeCode_key" ON "Employee"("employeeCode");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phone_key" ON "Employee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_positionId_key" ON "Employee"("positionId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_departmentId_key" ON "Employee"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Employeeinfo_employeeId_key" ON "Employeeinfo"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Employeeinfo_email_key" ON "Employeeinfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Reservedetail_customerId_key" ON "Reservedetail"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Roomtype_name_key" ON "Roomtype"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Roomtype_code_key" ON "Roomtype"("code");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("stateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("positionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employeeinfo" ADD CONSTRAINT "Employeeinfo_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employeeinfo" ADD CONSTRAINT "Employeeinfo_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("stateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employeeinfo" ADD CONSTRAINT "Employeeinfo_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("cityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("stateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("cityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservedetail" ADD CONSTRAINT "Reservedetail_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservedetail" ADD CONSTRAINT "Reservedetail_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservedetail" ADD CONSTRAINT "Reservedetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservedetail" ADD CONSTRAINT "Reservedetail_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Roomtype"("typeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roompicture" ADD CONSTRAINT "Roompicture_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("authId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cartnote" ADD CONSTRAINT "Cartnote_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("cartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productstock" ADD CONSTRAINT "Productstock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productstock" ADD CONSTRAINT "Productstock_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("supplierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saledetail" ADD CONSTRAINT "Saledetail_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("saleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saledetail" ADD CONSTRAINT "Saledetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("saleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banknote" ADD CONSTRAINT "Banknote_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("shiftId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groupmessage" ADD CONSTRAINT "Groupmessage_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthLog" ADD CONSTRAINT "AuthLog_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("authId") ON DELETE RESTRICT ON UPDATE CASCADE;
