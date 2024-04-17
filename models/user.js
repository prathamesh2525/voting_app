import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    aadharCardNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["voter", "admin"],
      default: "voter",
    },
    isVoted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next()

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
    next()
  } catch (error) {
    return next(error)
  }
})

userSchema.methods.comparePassword = async (password) => {
  try {
    const isCorrect = await bcrypt.compare(password, this.password)
    return isCorrect
  } catch (error) {
    throw error
  }
}

export const User = mongoose.model("User", userSchema)
