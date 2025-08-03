import { Router } from "express"

export default (rootDirectory: string): Router | Router[] => {
  const router = Router()

  router.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development"
    })
  })

  return router
} 