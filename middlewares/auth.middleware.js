import jwt from "jsonwebtoken"

const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Token Not Found" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: "Invalid Token" })
  }
}

export default verifyAuth
