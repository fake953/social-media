import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const userSchema = new mongoose.Schema({
  first_name: {
    required: true,
    type: String,
    min: 3,
  },
  last_name: {
    required: true,
    type: String,
    min: 3,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    min: 4,
  },
  picturePath: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    default: [],
  },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number,
});

userSchema.plugin(timestampsPlugin);

const User = mongoose.model("User", userSchema);
export default User;
