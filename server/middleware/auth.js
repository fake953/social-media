import jwt from "jsonwebtoken";

export const verifiedToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({
        data: null,
        message: "Access Denied! ",
      });
    }

    if (token.startsWith("bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};
