-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('active', 'dormant', 'suspended');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('active', 'pending', 'fired');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'others');

-- CreateEnum
CREATE TYPE "ReservationType" AS ENUM ('booked', 'reserve');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('paid', 'pending', 'cancel');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cash', 'credit_card', 'khqr', 'leave');

-- CreateTable
CREATE TABLE "Role" (
    "role_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "auth_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER,
    "status" "AccountStatus" NOT NULL DEFAULT 'active',
    "employee_id" INTEGER,
    "customer_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("auth_id")
);

-- CreateTable
CREATE TABLE "Attendace" (
    "attendace_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "Attendace_pkey" PRIMARY KEY ("attendace_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" SERIAL NOT NULL,
    "employee_code" TEXT,
    "status" "EmployeeStatus" NOT NULL DEFAULT 'active',
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'male',
    "dob" TIMESTAMP(3),
    "phone" TEXT,
    "position_id" INTEGER,
    "department_id" INTEGER,
    "salary" DECIMAL(10,2) NOT NULL,
    "hired_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "EmployeeInfo" (
    "info_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "picture" TEXT,
    "region" TEXT,
    "email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "note" TEXT,

    CONSTRAINT "EmployeeInfo_pkey" PRIMARY KEY ("info_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "department_id" SERIAL NOT NULL,
    "department_name" TEXT,
    "department_code" TEXT,
    "memo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Position" (
    "position_id" SERIAL NOT NULL,
    "department_id" INTEGER NOT NULL,
    "position_name" TEXT,
    "position_code" TEXT,
    "memo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" SERIAL NOT NULL,
    "account_status" "AccountStatus" NOT NULL DEFAULT 'active',
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "picture" TEXT,
    "gender" "Gender" NOT NULL DEFAULT 'male',
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "ReservationDetail" (
    "reserve_detail_id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "customer_id" INTEGER,
    "reservation_id" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "night" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "ReservationDetail_pkey" PRIMARY KEY ("reserve_detail_id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservation_id" SERIAL NOT NULL,
    "checkin_date" TIMESTAMP(3) NOT NULL,
    "checkout_date" TIMESTAMP(3) NOT NULL,
    "is_checkin" BOOLEAN NOT NULL,
    "is_checkout" BOOLEAN NOT NULL,
    "reservation_type" "ReservationType" NOT NULL DEFAULT 'reserve',
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'paid',
    "payment_method" "PaymentMethod" NOT NULL DEFAULT 'cash',
    "memo" TEXT,
    "is_hidden" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "Room" (
    "room_id" SERIAL NOT NULL,
    "room_type_id" INTEGER,
    "room_name" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "is_ac" BOOLEAN NOT NULL DEFAULT true,
    "capacity" INTEGER NOT NULL DEFAULT 4,
    "size" INTEGER NOT NULL DEFAULT 25,
    "discount_rate" INTEGER NOT NULL DEFAULT 0,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "RoomType" (
    "room_type_id" SERIAL NOT NULL,
    "type_name" TEXT NOT NULL,
    "type_code" TEXT NOT NULL,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("room_type_id")
);

-- CreateTable
CREATE TABLE "RoomPicture" (
    "room_picture_id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "picture_name" TEXT,
    "picture" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomPicture_pkey" PRIMARY KEY ("room_picture_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_code" TEXT,
    "product_category_id" INTEGER,
    "picture" TEXT,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "discount_rate" INTEGER NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "product_category_id" SERIAL NOT NULL,
    "picture" TEXT,
    "category_name" TEXT NOT NULL,
    "category_code" TEXT,
    "memo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("product_category_id")
);

-- CreateTable
CREATE TABLE "ProductStock" (
    "product_stock_id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "supplier_id" INTEGER,
    "inv_number" TEXT,
    "product_add" INTEGER NOT NULL DEFAULT 0,
    "add_price" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "add_date" TIMESTAMP(3),
    "memo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductStock_pkey" PRIMARY KEY ("product_stock_id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "supplier_id" SERIAL NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "company_name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "sale_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "room_id" INTEGER,
    "customer_id" INTEGER,
    "sale_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discount_rate" INTEGER NOT NULL DEFAULT 0,
    "total" DECIMAL(12,2) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("sale_id")
);

-- CreateTable
CREATE TABLE "SaleDetail" (
    "sale_detail_id" SERIAL NOT NULL,
    "sale_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaleDetail_pkey" PRIMARY KEY ("sale_detail_id")
);

-- CreateTable
CREATE TABLE "OpenShift" (
    "open_shift_id" SERIAL NOT NULL,
    "employee_id" INTEGER,
    "bank_note_id" INTEGER NOT NULL,
    "shift_code" TEXT NOT NULL,
    "open_khmer_riel" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "open_us_dollar" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "open_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OpenShift_pkey" PRIMARY KEY ("open_shift_id")
);

-- CreateTable
CREATE TABLE "CloseShift" (
    "close_shift_id" SERIAL NOT NULL,
    "employee_id" INTEGER,
    "bank_note_id" INTEGER NOT NULL,
    "shift_code" TEXT NOT NULL,
    "close_khmer_riel" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "close_us_dollar" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "close_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CloseShift_pkey" PRIMARY KEY ("close_shift_id")
);

-- CreateTable
CREATE TABLE "BankNote" (
    "bank_note_id" SERIAL NOT NULL,
    "khmer_100" INTEGER DEFAULT 0,
    "khmer_500" INTEGER DEFAULT 0,
    "khmer_1K" INTEGER DEFAULT 0,
    "khmer_2K" INTEGER DEFAULT 0,
    "khmer_5K" INTEGER DEFAULT 0,
    "khmer_10K" INTEGER DEFAULT 0,
    "khmer_15K" INTEGER DEFAULT 0,
    "khmer_20K" INTEGER DEFAULT 0,
    "khmer_30K" INTEGER DEFAULT 0,
    "khmer_50K" INTEGER DEFAULT 0,
    "khmer_100K" INTEGER DEFAULT 0,
    "khmer_200K" INTEGER DEFAULT 0,
    "us_1" INTEGER DEFAULT 0,
    "us_5" INTEGER DEFAULT 0,
    "us_10" INTEGER DEFAULT 0,
    "us_20" INTEGER DEFAULT 0,
    "us_50" INTEGER DEFAULT 0,
    "us_100" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankNote_pkey" PRIMARY KEY ("bank_note_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_employee_id_key" ON "Auth"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_customer_id_key" ON "Auth"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employee_code_key" ON "Employee"("employee_code");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phone_key" ON "Employee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeInfo_employee_id_key" ON "EmployeeInfo"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeInfo_email_key" ON "EmployeeInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RoomType_type_name_key" ON "RoomType"("type_name");

-- CreateIndex
CREATE UNIQUE INDEX "RoomType_type_code_key" ON "RoomType"("type_code");

-- CreateIndex
CREATE UNIQUE INDEX "OpenShift_bank_note_id_key" ON "OpenShift"("bank_note_id");

-- CreateIndex
CREATE UNIQUE INDEX "CloseShift_bank_note_id_key" ON "CloseShift"("bank_note_id");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendace" ADD CONSTRAINT "Attendace_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeInfo" ADD CONSTRAINT "EmployeeInfo_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationDetail" ADD CONSTRAINT "ReservationDetail_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationDetail" ADD CONSTRAINT "ReservationDetail_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationDetail" ADD CONSTRAINT "ReservationDetail_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationDetail" ADD CONSTRAINT "ReservationDetail_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "Reservation"("reservation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "RoomType"("room_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomPicture" ADD CONSTRAINT "RoomPicture_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "ProductCategory"("product_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductStock" ADD CONSTRAINT "ProductStock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductStock" ADD CONSTRAINT "ProductStock_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("supplier_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenShift" ADD CONSTRAINT "OpenShift_bank_note_id_fkey" FOREIGN KEY ("bank_note_id") REFERENCES "BankNote"("bank_note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenShift" ADD CONSTRAINT "OpenShift_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloseShift" ADD CONSTRAINT "CloseShift_bank_note_id_fkey" FOREIGN KEY ("bank_note_id") REFERENCES "BankNote"("bank_note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloseShift" ADD CONSTRAINT "CloseShift_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
