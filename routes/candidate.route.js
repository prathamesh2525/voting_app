import { Router } from "express"
import verifyAuth from "../middlewares/auth.middleware.js"
import { CandidateController } from "../controllers/candidate.controller.js"

const router = Router()

router.post("/", verifyAuth, CandidateController.add)

router.put("/:candidateId", verifyAuth, CandidateController.update)

router.delete("/:candidateId", verifyAuth, CandidateController.delete)

router.get("/vote/:candidateId", verifyAuth, CandidateController.vote)

router.get("/vote/count", CandidateController.voteCount)

router.get("/", CandidateController.getInfo)

export default router
