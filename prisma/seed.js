const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { ROLES, ROOMTYPES, STATE, CITY } = require("./seed-data");

const prisma = new PrismaClient();

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

  for (const state of STATE) {
    await prisma.state.upsert({
      where: {
        state_name: state.state_name,
      },
      update: {},
      create: state,
    });
  }

  for (const city of CITY) {
    await prisma.city.upsert({
      where: {
        city_name_state_id: {
          // Use the composite key
          city_name: city.city_name,
          state_id: city.state_id,
        },
      },
      update: {},
      create: city,
    });
  }

  const adminRole = await prisma.role.findUnique({
    where: { name: "admin" },
  });

  if (!adminRole) {
    throw new Error("Admin role not found!");
  }

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
