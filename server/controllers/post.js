import Post from "../model/post.js";
import User from "../model/user.js";

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
  const { userId, description, picturePath } = req.body;

  try {
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      description,
      picturePath,
      first_name: user.first_name,
      last_name: user.last_name,
      location: user.location,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
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

// export const deletePost = async (req, res) => {
//   const id = req.params["id"];

//   try {
//     await Post.findByIdAndDelete(id);
//     res.status(202).json({
//       data: null,
//       message: "deleted",
//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

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

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId });
    res.status(200).json({
      data: userPosts,
      message: "ok",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    // console.log(post.likes);

    // const isLiked = post.likes.get(userId);
    let newLikeList;
    if (post.likes.includes(userId)) {
      newLikeList = post.likes.splice(userId, 1);
      // filter((id) => String(id) !== userId);
      console.log("deleted");
    } else {
      newLikeList = post.likes.push(userId);
      console.log("setted");
    }
    const updatedPost = await post.save();
    // Post.findByIdAndUpdate(id, {
    //   likes: newLikeList,
    // });
    res.status(200).json({
      data: updatedPost,
      message: "ok",
    });
  } catch (error) {
    res.status(409).json({
      data: null,
      message: error.message,
    });
  }
};
