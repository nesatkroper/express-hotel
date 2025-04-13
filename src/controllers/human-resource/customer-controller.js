const path = require("path");
const { uploadPath } = require("@/provider/upload-path");

const {
  baseSelect,
  baseCreate,
  baseUpdate,
  basePatch,
  baseDestroy,
} = require("../../utils");

const model = "customer";

const select = async (req, res) => {
  try {
    const result = await baseSelect(
      model,
      req.params.id,
      req.query,
      `${model}Id`
    );

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
  let picture;
  try {
    picture = req.file ? path.basename(req.file.path) : null;
    const data = { ...req.body, picture };

    const result = await baseCreate(model, data);
    return res.status(201).json(result);
  } catch (err) {
    console.log(`Error creating ${model}:`, err);

    if (picture) {
      const filePath = path.join(
        __dirname,
        "../../../public/uploads/customer",
        picture
      );
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error("Failed to delete file:", unlinkErr);
      });
    }

    return res.status(500).json({ error: `Error :${err}` });
  }
};

const update = async (req, res) => {
  try {
    const result = await baseUpdate(
      model,
      req.params.id,
      req.body,
      req.file,
      uploadPath
    );

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ error: `Error: ${err.message}` });
  }
};

const patch = async (req, res) => {
  try {
    const result = await basePatch(model, req.params.id, req.query.type);

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ error: `Error :${err}` });
  }
};

const destroy = async (req, res) => {
  try {
    const result = await baseDestroy(model, req.params.id);
    return res.status(201).json(result);
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
