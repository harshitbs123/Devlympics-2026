import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";

// Register user
export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ExpressError(400, "All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ExpressError(400, "User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      signed: true,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      user: userResponse,
      token,
    });
  } else {
    throw new ExpressError(400, "Invalid user data");
  }
});

// Login user
export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new ExpressError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    signed: true,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(200).json({
    success: true,
    user: userResponse,
    token,
  });
});

// Logout user
export const logout = wrapAsync(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    signed: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Get current user profile
export const getMe = wrapAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
