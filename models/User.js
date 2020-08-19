const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["ProjectManager", "Frontend", "Backend", "Devops", "QA"],
    },
    resume: { type: String },
  },
  { timestamps: true }
);

UserSchema.statics.signin = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }

  const auth = password === user.password;
  if (!auth) {
    throw Error("Email or password is incorrect");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
