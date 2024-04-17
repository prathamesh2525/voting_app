import mongoose from "mongoose"
import "dotenv/config"

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mongo")
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Failed to connect to MongoDB", error)
  }
}

export default connectToDatabase
