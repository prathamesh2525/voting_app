import express from "express"
import "dotenv/config"
import userRoute from "./routes/user.route.js"
import connectToDatabase from "./db/db.js"

const app = express()

app.use(express.json())
app.use("/api/v1/", userRoute)

const PORT = process.env.PORT || 4000

connectToDatabase()


app.listen(PORT, () => {
  console.log(`app listening on port http://localhost:4000`)
})
