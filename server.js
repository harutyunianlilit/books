const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/books", (req, res) => {
  const books = require("./books.json");
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const books = require("./books.json");
  const book = books.find((book) => book.id === Number(id));

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const books = require("./books.json");
  const newBook = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const books = require("./books.json");
  const bookIndex = books.findIndex((book) => book.id === Number(id));

  if (bookIndex !== -1) {
    books[bookIndex] = {
      id: Number(id),
      title,
      author,
    };
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const books = require("./books.json");
  const bookIndex = books.findIndex((book) => book.id === Number(id));

  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook[0]);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
