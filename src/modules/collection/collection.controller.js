// ==========================================
// Collection Router
// ==========================================
import { Router } from "express";
import * as collectionService from "./collection.service.js";

const router = Router();

// 1. Create an explicit collection named "books" with a validation rule... (0.5 Grade)
router.post("/books", async (req, res, next) => {
  try {
    await collectionService.createBooksCollection();
    return res.status(201).json({ ok: 1 });
  } catch (error) {
    return next(new Error(error.message, { cause: { status: 400 } }));
  }
});

// 2. Create an implicit collection by inserting data directly into a new collection named "authors". (0.5 Grade)[cite: 5]
router.post("/authors", async (req, res, next) => {
  try {
    const result = await collectionService.createAuthorsImplicit(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 3. Create a capped collection named "logs" with a size limit of 1MB. (0.5 Grade)[cite: 5]
router.post("/logs/capped", async (req, res, next) => {
  try {
    await collectionService.createLogsCapped();
    return res.status(201).json({ ok: 1 });
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 4. Create an index on the books collection for the title field. (0.5 Grade)[cite: 5]
router.post("/books/index", async (req, res, next) => {
  try {
    await collectionService.createTitleIndex();
    return res.status(201).json({ ok: 1 });
  } catch (error) {
    return next(new Error(error.message));
  }
});

export default router;
