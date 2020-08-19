const Opening = require("../models/opening");

const index = async (req, res) => {
  const user = req.user;
  const role = user.role;

  let openings = [];
  if (role === "ProjectManager") {
    openings = await Opening.find({ createdBy: user.id, status: true }).exec();
  } else {
    openings = await Opening.find({
      role,
      status: true,
      appliedBy: { $ne: user.id },
    }).exec();
  }
  console.log({ openings });
  res.render("opening/index", { openings, user, page: "opening" });
};

const store = async (req, res) => {
  try {
    const opening = new Opening({ ...req.body, createdBy: req.user.id });
    savedOpening = await opening.save();
    res.redirect("/openings");
  } catch (e) {
    res.status(500).send(`some error happened - ${e}`);
  }
};

const create = (req, res) => {
  const user = req.user;
  res.render("opening/create", { user, opening: {}, page: "opening" });
};

const edit = async (req, res) => {
  const opening = await Opening.findById(req.params.id).exec();
  const user = req.user;
  res.render("opening/edit", { user, opening, page: "opening" });
};

const update = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateOps = {};
    for (const [key, value] of Object.entries(req.body)) {
      updateOps[key] = value;
    }
    const opening = await Opening.update({ _id }, { $set: updateOps });

    res.redirect("/openings");
  } catch (e) {
    res.status(500).send(`some error happened - ${e}`);
  }
};

const destroy = async (req, res) => {
  console.log("hello");
  try {
    const _id = req.params.id;
    await Opening.deleteOne({ _id }).exec();
    res.redirect("/openings");
  } catch (e) {
    res.status(500).send(`some error happened - ${e}`);
  }
};

const apply = async (req, res) => {
  try {
    const id = req.params.id;
    const opening = await Opening.findById(id).exec();
    opening.appliedBy = opening.appliedBy
      ? [...opening.appliedBy, req.body.appliedBy]
      : [req.body.appliedBy];
    console.log({ opening });

    await opening.save();
    res.redirect("/openings");
  } catch (e) {
    res.status(500).send(`some error happened - ${e}`);
  }
};

module.exports = { store, index, create, edit, update, destroy, apply };
