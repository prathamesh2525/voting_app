import { checkAdminRole } from "../config/auth"
import { Candidate } from "../models/candidate"

export class CandidateController {
  static async add(req, res) {
    try {
      if (!(await checkAdminRole(req.user.id))) {
        return res
          .status(403)
          .json({ message: "user does not have admin role" })
      }

      const data = req.body

      const newCandidate = await Candidate.create(data)
      res
        .status(200)
        .json({ message: "New Candidate added successfully.", newCandidate })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  static async update(req, res) {
    try {
      if (!checkAdminRole(req.user.id)) {
        return res
          .status(403)
          .json({ message: "user does not have admin role" })
      }

      const { candidateId } = req.params
      const updateCandidateData = req.body
      const res = await Candidate.findByIdAndUpdate(
        candidateId,
        updateCandidateData,
        {
          new: true,
        }
      )

      if (!res) {
        return res.status(404).json({ error: "Candidate not found" })
      }

      res.json(res)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  static async delete(req, res) {
    try {
      if (!checkAdminRole(req.user.id)) {
        return res
          .status(403)
          .json({ message: "user does not have admin role" })
      }
      const { candidateId } = req.params

      const res = await Candidate.findByIdAndDelete(candidateId)

      if (!res) {
        return res.status(404).json({ error: "Candidate not found" })
      }

      console.log("candidate deleted")
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Internal server error", error })
    }
  }

  static async vote(req, res) {
    const { candidateId } = req.params
    const userId = req.user.id

    try {
      const candidate = await Candidate.findById(candidateId)

      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" })
      }

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: "user not found" })
      }
      if (user.role == "admin") {
        return res.status(403).json({ message: "admin is not allowed" })
      }
      if (user.isVoted) {
        return res.status(400).json({ message: "You have already voted" })
      }

      candidate.votes.push({ user: userId })
      candidate.voteCount++
      await candidate.save()

      user.isVoted = true
      await user.save()

      return res.status(200).json({ message: "Vote recorded successfully" })
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", error })
    }
  }

  static async voteCount(req, res) {
    try {
      const candidate = await Candidate.find().sort({ voteCount: "desc" })

      const voteRecord = candidate.map((data) => {
        return {
          party: data.party,
          count: data.voteCount,
        }
      })

      return res.status(200).json(voteRecord)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", error })
    }
  }

  static async getInfo(req, res) {
    try {
      const candidates = await Candidate.find({}, "name party-_id")

      res.status(200).json(candidates)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", error })
    }
  }
}
