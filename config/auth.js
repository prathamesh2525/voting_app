import jwt from "jsonwebtoken"
import { User } from "../models/user"

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" })
}

const checkAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId)
    if (user.role === "admin") return true
  } catch (error) {
    return false
  }
}

export { generateToken, checkAdminRole }
