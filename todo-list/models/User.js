const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nanoid = require("nanoid");

const SALT_WORK_FACTOR = 10;

const UserShema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

UserShema.methods.generateToken = function() {
  this.token = nanoid();
};

UserShema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

UserShema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model("User", UserShema);

module.exports = User;
