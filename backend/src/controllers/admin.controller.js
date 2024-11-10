import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to generate tokens
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

// Register a new user (only if needed)
export const register = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    throw new ApiError(400, "Username and password are required");
  }

  const existingUser = await Admin.findOne({ userName });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await Admin.create({ userName, password: hashedPassword });

  if (!user) {
    throw new ApiError(500, "User registration failed");
  }

  res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
});

// Admin login
export const login = asyncHandler(async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find user by userName
    const user = await Admin.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Invalid credentials: User not found"));
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Invalid credentials: Incorrect password"));
    }

    // Generate token on successful login
    const token = generateAccessToken(user._id);
    return res
      .status(200)
      .cookie("token", token, { httpOnly: false, maxAge: 3600000, sameSite: "None", secure: process.env.NODE_ENV === "production" })
      .json(new ApiResponse(200, { user }, "Login successful"));
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "An unexpected error occurred during login"));
  }
});

// Logout user
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", { httpOnly: false });
  res.status(200).json(new ApiResponse(200, {}, "Logged out successfully"));
});
