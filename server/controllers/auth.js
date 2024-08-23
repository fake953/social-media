import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const registerUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    friends,
    location,
    picturePath,
    occupation,
  } = req.body;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return res.status(400).json({
      message: "user with the given email already exist!",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      friends,
      location,
      occupation,
      picturePath,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    const token = await jwt.sign({ _id: savedUser.id }, process.env.JWT_KEY);
    delete savedUser.password;
    res.status(201).json({
      data: { token, savedUser },
      message: "created",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      data: null,
      message: "invalid email or password !",
    });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(404).json({
      data: null,
      message: "invalid email or password !",
    });
  }
  const token = await jwt.sign({ _id: user.id }, process.env.JWT_KEY);
  res.status(200).json({
    data: { token, savedUser: user },
    message: "successfully logged in !",
  });
};
