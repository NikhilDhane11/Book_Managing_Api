const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./database')
const Book = require('./models/book');

const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post('/books', (req, res) => {
    const newBook = new Book(req.body);
    newBook.save()
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  });



  app.get('/books', async (req, res) => {
    try {
      const books = await Book.find({});
      const count = books.length
      if (books) {
        res.status(200).json({"Total Book Count" :count, books});
      } else {
        res.status(404).json({ message: 'No books found' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


  app.get('/books/:bookId', async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ message: `Book was not found for this ID:- ${bookId}` });
      }
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  app.put('/books/:bookId', async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
  
      if (!updatedBook) {
        return res.status(404).json({ error: `Book was not found for this ID: ${bookId}` });
      }
  
      return res.status(200).json(updatedBook);
    } catch (err) {
      console.error(err); 
  
      if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid book ID format' });
      }
  
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
      }
  
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  });
  
  

  app.delete('/books/:bookId', async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const deletedBook = await Book.findByIdAndRemove(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({ message: `Book was not found for this ID:- ${bookId}` });
      } else {
        return res.status(200).json({ message: `${deletedBook.title} Book was deleted` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
          
  module.exports = app;
