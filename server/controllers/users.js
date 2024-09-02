import User from "../model/user.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(200).json({
        data: null,
        message: "cannot find user with this id",
      });
    }
    res.status(200).json({
      data: user,
      message: "ok",
    });
  } catch (error) {
    res.status(404).json({
      data: null,
      message: error.message,
    });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const { friends } = await User.findById(id);
    const userFriendsDetail = await Promise.all(
      friends.map((id) => User.findById(id))
    );
    const formattedFriends = userFriendsDetail.map(
      ({ _id, first_name, last_name, picturePath, location, occupation }) => {
        return {
          _id,
          first_name,
          last_name,
          picturePath,
          location,
          occupation,
        };
      }
    );
    res.status(200).json({
      data: formattedFriends,
      message: "ok",
    });
  } catch (error) {
    res.status(404).json({
      data: null,
      message: error.message,
    });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const newFriend = await User.findById(friendId);
    if (user?.friends?.includes(friendId)) {
      user.friends = user.friends?.filter((id) => id !== friendId);
      newFriend.friends = newFriend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      newFriend.friends.push(user._id);
    }

    await user.save();
    await newFriend.save();

    // const userAllFriendsDetail = await Promise.all(
    //   user.friends.map((id) => User.findById(id))
    // );
    // const formattedFriends = userAllFriendsDetail.map(
    //   ({ _id, first_name, last_name, picturePath, location, occupation }) => {
    //     return {
    //       _id,
    //       first_name,
    //       last_name,
    //       picturePath,
    //       location,
    //       occupation,
    //     };
    //   }
    // );
    const updatedUser = await User.findById(id);
    const userFriends = updatedUser.friends;

    res.status(200).json({
      data: userFriends,
      message: "ok",
    });
  } catch (error) {
    res.status(404).json({
      data: null,
      message: error.message,
    });
  }
};
