// const { PrismaClient } = require("@prisma/client");
// const bcrypt = require("bcrypt");
// const { ROLES, ROOMTYPES, STATE, CITY } = require("./seed-data");

// const prisma = new PrismaClient();

// const main = async () => {
//   for (const role of ROLES) {
//     await prisma.role.upsert({
//       where: { name: role.name },
//       update: {},
//       create: role,
//     });
//   }

//   for (const type of ROOMTYPES) {
//     await prisma.roomtype.upsert({
//       where: {
//         type_name: type.type_name,
//         type_code: type.type_code,
//       },
//       update: {},
//       create: type,
//     });
//   }

//   for (const state of STATE) {
//     await prisma.state.upsert({
//       where: {
//         state_name: state.state_name,
//       },
//       update: {},
//       create: state,
//     });
//   }

//   for (const city of CITY) {
//     await prisma.city.upsert({
//       where: {
//         city_name_state_id: {
//           city_name: city.city_name,
//           state_id: city.state_id,
//         },
//       },
//       update: {},
//       create: city,
//     });
//   }

//   const adminRole = await prisma.role.findUnique({
//     where: { name: "admin" },
//   });

//   if (!adminRole) {
//     throw new Error("Admin role not found!");
//   }

//   await prisma.auth.create({
//     data: {
//       email: "admin@nun.com",
//       password: await bcrypt.hash("123456", 10),
//       role_id: adminRole.role_id,
//     },
//   });

//   console.log("✅ Default ROLES and admin user created successfully!");
// };

// // Run seeding
// main()
//   .catch((e) => {
//     console.error("❌ Error seeding database:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
const { PrismaClient } = require("@prisma/client");

const CITY = [
  { city_name: "Samraong", state_id: 22 },
  { city_name: "Trapeang Prasat", state_id: 22 },
  { city_name: "Damnak Chang'aeur", state_id: 23 },
  { city_name: "Kaeb", state_id: 23 },
  { city_name: "Pailin", state_id: 24 },
  { city_name: "Sala Krau", state_id: 24 },
  { city_name: "Dambae", state_id: 25 },
  { city_name: "Krouch Chhmar", state_id: 25 },
  { city_name: "Memot", state_id: 25 },
  { city_name: "Ou Reang Ov", state_id: 25 },
  { city_name: "Ponhea Kraek", state_id: 25 },
  { city_name: "Suong", state_id: 25 },
  { city_name: "Tboung Khmum", state_id: 25 },
];

const prisma = new PrismaClient();

const main = async () => {
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

  console.log("✅ Cities seeded successfully!");
};

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
