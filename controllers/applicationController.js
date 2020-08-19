const Opening = require("../models/opening");
const User = require("../models/User");

const index = async (req, res) => {
  const user = req.user;
  const openings = await Opening.find({
    createdBy: user.id,
    status: true,
  })
    .select("appliedBy projectName")
    .exec();

  const applicants = [];
  for (opening of openings) {
    if (opening.appliedBy.length === 0) {
      continue;
    }

    const applicant = opening.appliedBy.map(appliedBy => ({
      appliedBy,
      projectName: opening.projectName,
    }));

    applicants.push(...applicant);
  }

  const applications = [];
  for (applicant of applicants) {
    const application = await User.findById(applicant.appliedBy).exec();
    application.projectName = applicant.projectName;
    applications.push(application);
  }

  res.render("applications/index", {
    user,
    applications,
    page: "applications",
  });
};

const download = async (req, res) => {
  const _id = req.params.id;
  const user = await User.findOne({ _id }).exec();
  const file = `${__dirname}/../uploads/${user.resume}`;
  res.download(file);
};

module.exports = { index, download };
