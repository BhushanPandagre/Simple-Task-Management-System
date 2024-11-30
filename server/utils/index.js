import jwt from "jsonwebtoken";
export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    // secure: false,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24 * 1, //1 day
    sameSite: "strict", //prevent csrf attack
    // sameSite: "none",
  });
};