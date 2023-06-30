const express = require('express');
const mainController = require('../controllers/main');

const router = express.Router();

router.get('/', mainController.home);
router.get('/books/detail/:id', mainController.bookDetail);  //B
router.get('/books/search', mainController.bookSearch);  // B
/* router.post('/books/search', mainController.bookSearchResult); */
router.get('/authors', mainController.authors);   //B
router.get('/authors/:id/books', mainController.authorBooks);   //B
router.get('/users/register', mainController.register);
router.post('/users/register', mainController.processRegister);
router.get('/users/login', mainController.login);
router.post('/users/login', mainController.processLogin);
router.get('/books/edit/:id', mainController.edit);
router.post('/books/update/:id', mainController.processEdit);
router.post('/books/delete/:id', mainController.deleteBook);

module.exports = router;
