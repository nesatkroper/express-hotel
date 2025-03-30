const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { ROLE, ROOMTYPE, STATE, CITY } = require("./seed-data");

const prisma = new PrismaClient();

const main = async () => {
  for (const role of ROLE) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  for (const roomtype of ROOMTYPE) {
    await prisma.roomtype.upsert({
      where: {
        type: roomtype.type,
        code: roomtype.code,
      },
      update: {},
      create: roomtype,
    });
  }

  for (const state of STATE) {
    await prisma.state.upsert({
      where: {
        name: state.name,
      },
      update: {},
      create: state,
    });
  }

  // for (const city of CITY) {
  //   await prisma.city.upsert({
  //     where: {
  //       city_name_state_id: {
  //         city_name: city.city_name,
  //         state_id: city.state_id,
  //       },
  //     },
  //     update: {},
  //     create: city,
  //   });
  // }

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
      roleId: adminRole.roleId,
    },
  });

  console.log("✅ Default ROLES and admin user created successfully!");
};

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
