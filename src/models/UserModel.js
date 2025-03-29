import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email",
      ],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide Password"],
      minlength: 6,
    },
    first_name: {
      type: String,
      required: [true, "Please provide First Name"],
      minlength: 1,
      maxlength: 35,
    },

    last_name: {
      type: String,
      required: [true, "Please provide Last Name"],
      minlength: 1,
      maxlength: 35,
    },
    favoriteWorkouts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Workout",
      default: [],
    },
    refreshToken: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// Do we needs RefreshToken?
userSchema.methods.createRefreshToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

userSchema.statics.checkExistUser = async function (body) {
  const { email, password } = body;

  if (!email || !password) {
    return null;
  }

  const user = await this.findOne({ email });
  if (!user) {
    return null;
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return null;
  }
  return user;
};

const User = mongoose.model("User", userSchema);
export default User;
