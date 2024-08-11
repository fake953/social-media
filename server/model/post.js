import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  creator: String,
  title: String,
  picturePath: String,
  description: String,
  viewed: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
});
const Post = mongoose.model("Post", postSchema);
export default Post;
