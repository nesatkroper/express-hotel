const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const ROLES = [
  { name: "admin" },
  { name: "user" },
  { name: "management" },
  { name: "accountant" },
  { name: "sale" },
];

const ROOMTYPES = [
  { type_name: "Single Room", type_code: "TYPE-001" },
  { type_name: "Double Room", type_code: "TYPE-002" },
  { type_name: "Luxary Room", type_code: "TYPE-003" },
  { type_name: "Suite Room", type_code: "TYPE-004" },
];

const main = async () => {
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  for (const type of ROOMTYPES) {
    await prisma.roomtype.upsert({
      where: {
        type_name: type.type_name,
        type_code: type.type_code,
      },
      update: {},
      create: type,
    });
  }

  // Find admin role
  const adminRole = await prisma.role.findUnique({
    where: { name: "admin" },
  });

  if (!adminRole) {
    throw new Error("Admin role not found!");
  }

  // Create an admin user
  await prisma.auth.create({
    data: {
      email: "admin@nun.com",
      password: await bcrypt.hash("123456", 10),
      role_id: adminRole.role_id,
    },
  });

  console.log("✅ Default ROLES and admin user created successfully!");
};

// Run seeding
main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
