const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(beautifyUnique);

const user = mongoose.model("User", UserSchema);

module.exports = user;
