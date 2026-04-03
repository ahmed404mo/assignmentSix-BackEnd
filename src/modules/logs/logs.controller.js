// ==========================================
// Logs Router
// ==========================================
import { Router } from "express";
import * as logsService from "./logs.service.js";

const router = Router();

// 7. Insert a new log into the logs collection. (0.5 Grade)[cite: 5]
router.post("/", async (req, res, next) => {
  try {
    const result = await logsService.insertLog(req.body);
    return res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
    });
  } catch (error) {
    return next(new Error(error.message));
  }
});

export default router;

