# 🚀 Route - Assignment 8 Solution (MongoDB & Express.js)

Welcome to the solution repository for **Assignment 8**. This assignment demonstrates a deep understanding of MongoDB native driver integration with Node.js/Express.js, alongside writing raw MongoDB Shell queries.

## 📁 Project Structure

The project implements a clean layered architecture and is split into two primary deliverables:
1. **Express.js API:** Using the native `mongodb` package to perform structural operations, CRUD, and Aggregations.
2. **MongoDB Shell:** A standalone `mongosh-solutions.txt` file containing equivalent raw queries.

### 🌐 Endpoints & Features
- **Collections API:**
  - `POST /collection/books`: Creates an explicit collection with a JSON Schema Validator (title is required and non-empty).
  - `POST /collection/authors`: Creates an implicit collection.
  - `POST /collection/logs/capped`: Creates a 1MB capped collection.
  - `POST /collection/books/index`: Creates a single-field index on the `title`.
- **Books CRUD API:**
  - `POST /books` & `/books/batch`: Insert single/multiple records.
  - `PATCH /books/:title`: Updates a specific book's year.
  - `GET /books/...`: Various querying mechanisms:
    - By Title (`/title`), Year range (`/year`), Genre (`/genre`), and Type matching (`/year-integer`).
    - Pagination & Sorting (`/skip-limit`).
    - Exclusion querying (`/exclude-genres`).
  - `DELETE /books/before-year`: Deletes books older than a given year.
- **Aggregation Framework API:**
  - `/aggregate1`: Matches books `> 2000` and sorts them in descending order.
  - `/aggregate2`: Matches and projects specific fields (`title`, `author`, `year`).
  - `/aggregate3`: Unwinds the `genres` array.
  - `/aggregate4`: Performs a `$lookup` (Join) between `logs` and `books` collections.

---

## ⚙️ How to Run

1. Ensure your local MongoDB server is running.
2. Configure your DB Connection URL in `config.service.js` or `.env`.
3. Install dependencies:
   ```bash
   npm install
Start the server:

Bash
npm start
🧪 Postman & Shell Deliverables
Check the mongosh-solutions.txt file for the direct shell command solutions.

Please refer to the attached Postman Collection link in the submission email to test the APIs seamlessly. All endpoints are saved with meaningful names.
