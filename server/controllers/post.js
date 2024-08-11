import Post from "../model/post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      data: posts,
      message: "ok",
    });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
export const createPost = async (req, res) => {
  const postData = req.body;
  const newPost = new Post(req.body);

  try {
    const createdPost = await newPost.save();
    res.status(201).json({
      data: createdPost,
      message: "created",
    });
  } catch (error) {
    res.status(406).json({
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params["id"];

  try {
    await Post.findByIdAndDelete(id);
    res.status(202).json({
      data: null,
      message: "deleted",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const chosenPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params["id"]);
    res.status(200).json({
      data: post,
      message: "ok",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
