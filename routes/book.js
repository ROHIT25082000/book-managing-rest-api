const express = require('express');
const router = express.Router(); 

const { getBooks, AddBook, deleteBook, updateBookDetails } = require('../controllers/book_controller');

// get all books
router.get('/', getBooks);
//  Post a book route 
router.post('/', AddBook);
// Delete a book with a given id 
router.delete('/:id', deleteBook); 
// Update a book with the given id 
router.patch('/:id', updateBookDetails); 

module.exports = router;
