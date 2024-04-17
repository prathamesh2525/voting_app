import mongoose from "mongoose"

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    party: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      requied: true,
    },
    votes: [
      {
        voter: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        votedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    voteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export const Candidate = mongoose.model("Candidate", candidateSchema)
