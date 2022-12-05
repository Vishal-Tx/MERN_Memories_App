import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  picture: String,
  sub: String,
  id: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
