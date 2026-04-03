
// ==========================================
// Collection Service
// ==========================================
import { db } from "../../DB/connection.db.js";

export const createBooksCollection = async () => {
  return await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
          },
        },
      },
    },
  });
};

export const createAuthorsImplicit = async (authorData) => {
  return await db.collection("authors").insertOne(authorData);
};

export const createLogsCapped = async () => {
  return await db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024,
  });
};

export const createTitleIndex = async () => {
  return await db.collection("books").createIndex({ title: 1 });
};