# Book Library API

Book Library API is a back-end application that provides an API for managing a collection of books. Users can perform CRUD operations on the books through API endpoints. This README provides an overview of the project and instructions on how to run and test the API.

## Technologies Used

The Book Library API is built using the following technologies:

- Express: A fast and minimalist web application framework for Node.js.
- PostgreSQL: A powerful open-source relational database system.
- Sequelize: An ORM (Object-Relational Mapping) library for Node.js, used for interacting with the PostgreSQL database.
- Postman: A popular API development and testing tool.

## Installation

To get started with the Book Library API project, you need to clone the repository from GitHub:

```shell
git clone https://github.com/Abi-Turner/book-library.git
```

Once you have cloned the repository, navigate to the project directory:

```shell
cd book-library
```

Install the necessary dependencies by running:

```shell
npm install
```

## Database Setup

The Book Library API requires a PostgreSQL database. Before running the application, you need to create a PostgreSQL database and configure the connection settings.

1. Create a PostgreSQL database with the desired name.

2. In the project directory, locate the `.env` file and update the following variables to match your PostgreSQL database configuration:

   ```plaintext
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   ```

## Running the API

To start the Book Library API, run the following command:

```shell
npm start
```

The API server should start running on `http://localhost:3000`.

## API Endpoints

The Book Library API exposes the following endpoints:

- `GET /books`: Get all books in the library.
- `GET /books/:id`: Get a specific book by its ID.
- `POST /books`: Add a new book to the library.
- `PUT /books/:id`: Update a specific book by its ID.
- `DELETE /books/:id`: Delete a specific book by its ID.

You can use Postman or any other API development tool to make requests to these endpoints and interact with the Book Library API.

## Testing

The Book Library API includes tests to ensure the functionality of the application. To run the tests, use the following command:

```shell
npm test
```

## License

The Book Library API project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more information.

## Author

Abi Turner
