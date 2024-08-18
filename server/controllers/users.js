import User from "../model/user.js";

export const getUser = async (req, res) => {
  try {
    const { id } = res.params;
    const user = await User.findById(id);

    res.status(200).json({
      data: user,
      message: "ok",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
    });
  }
};
