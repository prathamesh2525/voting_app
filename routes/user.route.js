import { Router } from "express"
import { UserController } from "../controllers/user.controller.js"
import verifyAuth from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/signup", UserController.register)

router.post("/signin", UserController.login)

router.get("/profile", verifyAuth, UserController.getProfile)

router.post("/change-password", verifyAuth, UserController.changePassword)

export default router
