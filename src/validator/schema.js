const { z } = require("zod");

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role_id: z.number().optional(),
  employee_id: z.number().optional(),
  customer_id: z.number().optional(),
});

const employeeSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/)
    .optional(),
  account_status: z.enum(["available", "unavailable"]).default("available"),
  gender: z.enum(["male", "female", "others"]).default("male"),
  salary: z.number().min(0).max(1000000).optional(),
  hired_date: z.date().optional(),
  department_id: z.number().optional(),
  position_id: z.number().optional(),
});

const reservationSchema = z.object({
  checkin_date: z.date(),
  checkout_date: z.date().refine(
    (date, ctx) => {
      if (date <= ctx.parent.checkin_date) {
        return false;
      }
      return true;
    },
    {
      message: "Checkout date must be after check-in date",
    }
  ),
  is_checkin: z.boolean().default(false),
  is_checkout: z.boolean().default(false),
  reservation_type: z.enum(["booked", "reserve"]).default("reserve"),
  adults: z.number().min(1),
  children: z.number().min(0).default(0),
  payment_status: z.enum(["paid", "pending", "cancel"]).default("paid"),
  payment_method: z
    .enum(["cash", "credit_card", "khqr", "leave"])
    .default("cash"),
});

const productSchema = z.object({
  product_name: z.string().min(2),
  product_code: z.string().optional(),
  price: z.number().min(0).max(1000000),
  discount_rate: z.number().int().min(0).max(100).optional(),
  status: z.boolean().default(true),
});

const bankNoteSchema = z.object({
  khmer_100: z.number().int().min(0).optional(),
  khmer_500: z.number().int().min(0).optional(),
  khmer_1K: z.number().int().min(0).optional(),
  khmer_2K: z.number().int().min(0).optional(),
  khmer_5K: z.number().int().min(0).optional(),
  khmer_10K: z.number().int().min(0).optional(),
  khmer_15K: z.number().int().min(0).optional(),
  khmer_20K: z.number().int().min(0).optional(),
  khmer_30K: z.number().int().min(0).optional(),
  khmer_50K: z.number().int().min(0).optional(),
  khmer_100K: z.number().int().min(0).optional(),
  khmer_200K: z.number().int().min(0).optional(),
  us_1: z.number().int().min(0).optional(),
  us_5: z.number().int().min(0).optional(),
  us_10: z.number().int().min(0).optional(),
  us_20: z.number().int().min(0).optional(),
  us_50: z.number().int().min(0).optional(),
  us_100: z.number().int().min(0).optional(),
});

module.exports = {
  authSchema,
  employeeSchema,
  reservationSchema,
  productSchema,
  bankNoteSchema,
};
