import mongoose from "mongoose"
import { User } from "../models/user.js"

import vine, { errors } from "@vinejs/vine"
import { generateToken } from "../config/auth.js"

const userSchema = vine.object({
  name: vine.string(),
  email: vine.string().email().optional(),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
  age: vine.number().min(18),
  mobile: vine.number().optional(),
  address: vine.string(),
  aadharCardNumber: vine.number(),
  isVoted: vine.boolean().optional(),
  role: vine.enum(["voter", "admin"]).optional(),
})

export class UserController {
  static async register(req, res) {
    try {
      const validator = vine.compile(userSchema)
      const output = await validator.validate(req.body)

      const adminUser = await User.findOne({
        role: "admin",
      })

      // Check if there is already an admin user
      if (output.role === "admin" && adminUser) {
        return res.status(400).json({ error: "Admin user already exists" })
      }

      // Validate Aadhar Card Number must have exactly 12 digit
      if (!/^\d{12}$/.test(output.aadharCardNumber)) {
        return res
          .status(400)
          .json({ error: "Aadhar Card Number must be exactly 12 digits" })
      }

      const existingUser = await User.findOne({
        aadharCardNumber: output.aadharCardNumber,
      })

      // Check if a user with the same Aadhar Card Number already exists
      if (existingUser) {
        return res.status(400).json({
          error: "User with the same Aadhar Card Number already exists",
        })
      }

      const newUser = await User.create(output)
      const res = await newUser.save()

      const payload = {
        id: res.id,
        name: res.name,
      }

      const token = generateToken(payload)

      res.status(200).json({
        response: res,
        token,
      })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log(error.messages)
      }
    }
  }

  static async login(req, res) {
    try {
      const { aadharCardNumber, password } = req.body

      if (!aadharCardNumber || !password) {
        return res
          .status(400)
          .json({ error: "Aadhar Card Number and password are required" })
      }

      const user = await User.findOne({ aadharCardNumber: aadharCardNumber })

      if (!user || !(await user.comparePassword(password))) {
        return res
          .status(401)
          .json({ error: "Invalid Aadhar Card Number or Password" })
      }

      const payload = {
        id: user.id,
        name: user.name,
      }
      const token = generateToken(payload)

      res.json({ token })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  static async getProfile(req, res) {
    try {
      const userData = req.user
      const userId = userData.id
      const user = await User.findById(userId)
      res.status(500).json({ user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  static async changePassword(req, res) {
    try {
      const userId = req.user.id

      const { currentPassword, newPassword } = req.body

      if (!currentPassword || !newPassword) {
        return res
          .status(400)
          .json({ error: "Both currentPassword and newPassword are required" })
      }

      const user = await User.findById(userId)

      if (!user || !(await user.comparePassword(currentPassword))) {
        return res.status(401).json({ error: "Invalid current password" })
      }

      user.password = newPassword
      await user.save()

      console.log("password updated")
      res.status(200).json({ message: "Password updated" })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
