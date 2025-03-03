const {
  baseSelect,
  baseCreate,
  baseUpdate,
  basePatch,
  baseDestroy,
} = require("../base/base-controller");

const model = "customer";
const idField = "customer_id";

const select = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await baseSelect(model, id, req.query, idField);

    if (!result || (Array.isArray(result) && !result.length)) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: `Error: ${err.message}` });
  }
};

const create = async (req, res) => {
  try {
    const picture = req.file ? path.basename(req.file.path) : null;
    const data = { ...req.body, picture };

    const result = await baseCreate(model, data);
    return res.status(200).json(result);
  } catch (err) {
    console.error(`Error creating ${model}:`, err);
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  try {
    const result = await baseUpdate(model, req.params.id, req.body);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: `Error: ${err.message}` });
  }
};

const patch = async (req, res) => {
  try {
    const result = await basePatch(model, req.params.id, req.query.type);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const destroy = async (req, res) => {
  try {
    const result = await baseDestroy(model, req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: `Error: ${err.message}` });
  }
};

module.exports = {
  select,
  create,
  update,
  patch,
  destroy,
};

// const update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       first_name,
//       last_name,
//       gender,
//       email,
//       phone,
//       address,
//       city,
//       state,
//     } = req.body;

//     const picture = req.file ? path.basename(req.file.path) : null;

//     const customer = await prisma.customer.findUnique({
//       where: { customer_id: parseInt(id, 10) },
//     });

//     if (picture !== null) {
//       const imagePath = path.join(
//         __dirname,
//         "../../public/uploads/customer",
//         customer.picture
//       );

//       fs.unlink(imagePath, (err) => {
//         if (err) console.log(`Error deleting file: ${err}`);
//         else console.log(`Removed image file: ${imagePath}`);
//       });

//       await prisma.customer.update({
//         where: { customer_id: parseInt(id) },
//         data: {
//           picture,
//           first_name,
//           last_name,
//           gender,
//           email,
//           phone,
//           address,
//           city,
//           state,
//         },
//       });
//     } else {
//       await prisma.customer.update({
//         where: { customer_id: parseInt(id) },
//         data: {
//           first_name,
//           last_name,
//           gender,
//           email,
//           phone,
//           address,
//           city,
//           state,
//         },
//       });
//     }
//     console.log(update);
//     return res.status(200).json(update);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: `Error :${err}` });
//   }
// };

// const patch = async (req, res) => {
//   const { id } = req.params;
//   const { type } = req.query;

//   try {
//     if (type) {
//       const patch =
//         type == "remove"
//           ? await prisma.customer.update({
//               where: {
//                 customer_id: parseInt(id, 10),
//               },
//               data: { status: "disactive" },
//             })
//           : type == "restore"
//           ? await prisma.customer.update({
//               where: {
//                 customer_id: parseInt(id, 10),
//               },
//               data: { status: "active" },
//             })
//           : "Type Invalided.";

//       return res.status(200).json(patch);
//     }
//     return res.status(400).json({ msg: "Type Undefined." });
//   } catch (err) {
//     return res.status(500).json({ error: `Error :${err}` });
//   }
// };

// const destroy = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const category = await prisma.customer.findUnique({
//       where: { customer_id: parseInt(id, 10) },
//     });

//     if (!category) return res.status(404).json({ error: " not found" });

//     const destroy = await prisma.customer.delete({
//       where: { customer_id: parseInt(id) },
//     });

//     const imagePath = path.join(
//       __dirname,
//       "../../public/uploads/customer",
//       customer.picture
//     );

//     fs.unlink(imagePath, (err) => {
//       if (err) console.log(`Error deleting file: ${err}`);
//       else console.log(`Removed image file: ${imagePath}`);
//     });

//     return res.status(200).json(destroy);
//   } catch (err) {
//     return res.status(500).json({ error: `Error :${err}` });
//   }
// };

// module.exports = {
//   select,
//   create,
//   update,
//   patch,
//   destroy,
// };
