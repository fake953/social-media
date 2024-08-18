import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  userPicturePath: String,
  picturePath: String,
  likes: {
    type: Map,
    of: Boolean,
  },
  comment: {
    type: Array,
    default: [],
  },
});
postSchema.plugin(timestampsPlugin);
const Post = mongoose.model("Post", postSchema);
export default Post;
