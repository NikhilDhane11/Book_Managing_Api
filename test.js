const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); // Assuming your Express app is in app.js

chai.use(chaiHttp);
const expect = chai.expect;

describe('Books API', () => {
  // Store the book ID for testing GET, PUT, and DELETE
  let bookId;

  // Create a book before testing the update endpoint
  before((done) => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
    };

    chai.request(app)
      .post('/books')
      .send(newBook)
      .end((err, res) => {
        bookId = res.body._id; // Store the book ID for later use
        done();
      });
  });

  // Test creating a new book
  it('should create a new book', (done) => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
    };

    chai.request(app)
      .post('/books')
      .send(newBook)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title', newBook.title);
        expect(res.body).to.have.property('author', newBook.author);
        bookId = res.body._id; // Store the book ID for later use
        done();
      });
  });

  // Test retrieving all books
  it('should retrieve all books', (done) => {
    chai.request(app)
      .get('/books')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('Total Book Count');
        expect(res.body).to.have.property('books').to.be.an('array');
        done();
      });
  });

  // Test retrieving a specific book
  it('should retrieve a specific book', (done) => {
    chai.request(app)
      .get(`/books/${bookId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('author');
        done();
      });
  });

//   Test updating a specific book

it('should update a specific book', (done) => {
    const updatedBookData = {
      title: 'Updated Title',
      author: 'Updated Author',
    };

    chai.request(app)
      .put(`/books/${bookId}`)
      .send(updatedBookData)
      .end((err, res) => {
        expect(res).to.have.status(200); // Expect a 200 status code for a successful update
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title', updatedBookData.title);
        expect(res.body).to.have.property('author', updatedBookData.author);
        done();
      });
  });

  // Test deleting a specific book
  it('should delete a specific book', (done) => {
    chai.request(app)
      .delete(`/books/${bookId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  // Cleanup: Delete the test book
  after((done) => {
    chai.request(app)
      .delete(`/books/${bookId}`)
      .end(() => {
        done();
      });
  });
});
