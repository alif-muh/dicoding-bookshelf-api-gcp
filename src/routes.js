const {addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler} = require('./handler');

const routes = [
  // POST book
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },

  // GET all books
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },

  // GET book by id
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },

  // PUT book by id
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },

  // DELETE book by id
  {
    method: 'DELETE',
    path: '/boooks/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
