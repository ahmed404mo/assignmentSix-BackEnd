
// ==========================================
// Books Service
// ==========================================
import { db } from "../../DB/connection.db.js";

export const insertOneBook = async (bookData) => {
  return await db.collection("books").insertOne(bookData);
};

export const insertManyBooks = async (booksArray) => {
  return await db.collection("books").insertMany(booksArray);
};

export const updateBookYear = async (title, newYear) => {
  return await db
    .collection("books")
    .updateOne({ title: title }, { $set: { year: newYear } });
};

export const findBookByTitle = async (title) => {
  return await db.collection("books").findOne({ title: title });
};

export const findBooksByYearRange = async (from, to) => {
  return await db
    .collection("books")
    .find({
      year: {
        $gte: parseInt(from),
        $lte: parseInt(to),
      },
    })
    .toArray();
};

export const findBooksByGenre = async (genre) => {
  return await db.collection("books").find({ genres: genre }).toArray();
};

export const getBooksSkipLimit = async () => {
  return await db
    .collection("books")
    .find()
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();
};

export const getBooksWithIntYear = async () => {
  return await db
    .collection("books")
    .find({
      year: { $type: "int" },
    })
    .toArray();
};

export const getBooksExcludeGenres = async () => {
  return await db
    .collection("books")
    .find({
      genres: { $nin: ["Horror", "Science Fiction"] },
    })
    .toArray();
};

export const deleteBooksBeforeYear = async (year) => {
  return await db.collection("books").deleteMany({
    year: { $lt: parseInt(year) },
  });
};

export const getBooksSortAggregate = async () => {
  return await db
    .collection("books")
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $sort: { year: -1 } }
    ])
    .toArray();
};

export const getBooksFilterFieldsAggregate = async () => {
  return await db
    .collection("books")
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          year: 1,
        },
      },
    ])
    .toArray();
};

export const getBooksUnwindGenres = async () => {
  return await db
    .collection("books")
    .aggregate([
      { $unwind: "$genres" },
      { $project: { _id: 0, title: 1, genres: 1 } },
    ])
    .toArray();
};

export const getLogsWithBooks = async () => {
  return await db
    .collection("logs")
    .aggregate([
      {
        $addFields: {
          book_id_obj: { $toObjectId: "$book_id" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "book_id_obj",
          foreignField: "_id",
          as: "book_details",
        },
      },
      { $unwind: "$book_details" },
    ])
    .toArray();
};