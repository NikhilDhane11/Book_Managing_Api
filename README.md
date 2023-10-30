
The server will start on the specified port (default is 3000).

## Usage

This API allows you to perform CRUD operations on a collection of books. You can interact with it using HTTP requests, such as with tools like Postman or by integrating it into your application.

## Endpoints

### Create a new book

- URL: `/books`
- Method: POST
- Request Body: JSON object representing a book.
- Response: Returns the newly created book.

### Get all books

- URL: `/books`
- Method: GET
- Response: Returns a list of all books in the database along with the total book count.

### Get a specific book

- URL: `/books/:bookId`
- Method: GET
- Request Parameters: `bookId` is the ID of the book you want to retrieve.
- Response: Returns the book with the specified ID.

### Update a book

- URL: `/books/:bookId`
- Method: PUT
- Request Parameters: `bookId` is the ID of the book you want to update.
- Request Body: JSON object with the updated book information.
- Response: Returns the updated book.

### Delete a book

- URL: `/books/:bookId`
- Method: DELETE
- Request Parameters: `bookId` is the ID of the book you want to delete.
- Response: Returns a message confirming the deletion of the book.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Body-parser
