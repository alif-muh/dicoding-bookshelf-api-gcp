const {nanoid} = require('nanoid');
const books = require('./books');

// 3rd criteria: API can store books
const addBookHandler = (request, h) => {
  // book object structure to store
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

  // fail if !name
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // fail if readPage > readCount
  if (readPage > readCout) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // add book
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  // add book response
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
    });

    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

// 4th criteria: API can display all books
const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query; // get query parameters from HTTP req

  let filteredBooks = books; // initial books

  // name query
  if (name) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  // reading query
  if (reading) {
    filteredBooks = filteredBooks.filter((book) => book.reading === !!Number(reading));
  }

  // finished query
  if (finished) {
    filteredBooks = filteredBooks.filter((book) => book.finished === !!Number(finished));
  }

  // get all books response
  const response = h.response({
    status: 'success',
    data: {
      book: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  response.code(200);

  return response;
};

// 5th criteria: API can display a book details
const getBookByIdHandler = (request, h) => {
  const {id} = request.params;
  const book = book.filter((book) => book.id == id)[0];

  // if the book found
  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  // if the book not found
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// 6th criteria: API can edit a book data
const editBookByIdHandler = (reqeust, h) => {
  const {id} = reqeust.params;
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = reqeust.payload;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    // if !name
    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(404);
      return response;
    }

    // if readPage > readCount
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    // if success
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(404);
    return response;
  }

  // if id not found
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// 7th criteria: API can delete a book
const deleteBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const index = books.findIndex((book) => book.id === id);

  // if success
  if (index > -1) {
    book.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // if unsuccessful
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler};
