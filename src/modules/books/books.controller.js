// ==========================================
// Books Router
// ==========================================
import { Router } from "express";
import * as booksService from "./books.service.js";

const router = Router();

// 5. Insert one document into the books collection. (0.5 Grade)[cite: 5]
router.post("/", async (req, res, next) => {
  try {
    const result = await booksService.insertOneBook(req.body);
    return res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
    });
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 6. Insert multiple documents into the books collection with at least three records. (0.5 Grade)[cite: 5]
router.post("/batch", async (req, res, next) => {
  try {
    const result = await booksService.insertManyBooks(req.body);
    return res.status(201).json({
      acknowledged: result.acknowledged,
      insertedIds: result.insertedIds,
    });
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 8. Update the book with title "Future" change the year to be 2022. (0.5 Grade)[cite: 5]
router.patch("/:title", async (req, res, next) => {
  try {
    const { title } = req.params;
    const result = await booksService.updateBookYear(title, 2022);
    return res.status(200).json({
      acknowledged: result.acknowledged,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 9. Find a Book with title "Brave New World". (0.5 Grade)[cite: 5]
router.get("/title", async (req, res, next) => {
  try {
    const { title } = req.query;
    const result = await booksService.findBookByTitle(title);
    if (!result) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 10. Find all books published between 1990 and 2010. (0.5 Grade)[cite: 5]
router.get("/year", async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const result = await booksService.findBooksByYearRange(from, to);
    return res.status(200).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 11. Find books where the genre includes "Science Fiction". (0.5 Grade)[cite: 5]
router.get("/genre", async (req, res, next) => {
  try {
    const { genre } = req.query;
    const result = await booksService.findBooksByGenre(genre);
    return res.status(200).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 12. Skip the first two books, limit the results to the next three, sorted by year in descending order. (0.5 Grade)[cite: 5]
router.get("/skip-limit", async (req, res, next) => {
  try {
    const result = await booksService.getBooksSkipLimit();
    return res.status(200).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 13. Find books where the year field stored as an integer. (0.5 Grade)[cite: 5]
router.get("/year-integer", async (req, res, next) => {
  try {
    const result = await booksService.getBooksWithIntYear();
    return res.status(200).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 14. Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction". (0.5 Grade)[cite: 5]
router.get("/exclude-genres", async (req, res, next) => {
  try {
    const result = await booksService.getBooksExcludeGenres();
    return res.status(200).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 15. Delete all books published before 2000. (0.5 Grade)[cite: 5]
router.delete("/before-year", async (req, res, next) => {
  try {
    const { year } = req.query;
    const result = await booksService.deleteBooksBeforeYear(year);
    return res.status(200).json({
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 16. Using aggregation Functions, Filter books published after 2000 and sort them by year descending. (0.5 Grade)[cite: 5]
router.get("/aggregate1", async (req, res, next) => {
  try {
    const result = await booksService.getBooksSortAggregate();
    return res.status(200).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 17. Using aggregation functions, Find all books published after the year 2000. For each matching book, show only the title, author, and year fields. (0.5 Grade)[cite: 5]
router.get("/aggregate2", async (req, res, next) => {
  try {
    const result = await booksService.getBooksFilterFieldsAggregate();
    return res.status(200).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 18. Using aggregation functions, break an array of genres into separate documents. (0.5 Grade)[cite: 5]
router.get("/aggregate3", async (req, res, next) => {
  try {
    const result = await booksService.getBooksUnwindGenres();
    return res.status(200).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

// 19. Using aggregation functions, Join the books collection with the logs collection. (1 Grade)[cite: 5]
router.get("/aggregate4", async (req, res, next) => {
  try {
    const result = await booksService.getLogsWithBooks();
    return res.status(200).json(result);
  } catch (error) {
    return next(new Error(error.message));
  }
});

export default router;
