// ==========================================
// Logs Service
// ==========================================
import { db } from "../../DB/connection.db.js";

export const insertLog = async (logData) => {
  return await db.collection("logs").insertOne(logData);
};