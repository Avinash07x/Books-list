import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Create Book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newBook = await Book.create({ title, author, publishYear });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Book
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book updated successfully!", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Book
router.delete("/:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

