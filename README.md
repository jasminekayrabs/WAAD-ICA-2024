# K-Library Management System

## Overview
K-Library Management System is a web-based application designed to manage a library's book inventory. It allows librarians to add, update, and delete books but only when they are authorized. Users can browse books by categories, or simply search by title, author, or genre and view detailed information about each book.

## Architecture
The K-Library Management System is built with a front-end using HTML, CSS, and JavaScript. The back-end is a RESTful API providing endpoints for book management. Alpine.js is used for front-end interactivity.
### Front-End
- **HTML**: Structure of the web pages.
- **CSS**: Styling of the web pages, ensuring a user-friendly and visually appealing interface.
- **JavaScript**: Client-side logic using Alpine.js for reactive data-binding and interactivity.
### Back-End
The back-end provides RESTful API endpoints for:
- Fetching books.
- Adding, updating, and deleting books.
- Authenticating users (login and logout) with JsonWebTokens.
### Database
-PostgreSQL.
### Pages
- **Home Page `/index.html`**: Allows users to search for books or select a category they would like to browse.
- **Login Page `/login.html`**: Authenticates librarians and stores the JWT to session storage.
- **Register Page `/register.html`**: Registers new librarians.
- **Book Management Page '/books.html`**: Allows librarians to manage the book inventory.
- **Categories Page `categories.html?category=`**: Displays books in a selected category.
- **Book Details Page `details.html?id=`**: Shows detailed information about a selected book.
### API Endpoints
**Home**
- `GET /` : Fetch searched books from the database and display categories. 
- **User Authentication**
  - `POST /api/auth/login`: Authenticate a librarian and return a JWT token.
  - `POST /api/auth/register`: Register a new librarian.
- **Book Management**
  - `GET /api/books`: Retrieve a list of all books.
  - `GET /api/books/:id`: Retrieve details of a specific book.
  - `POST /api/books`: Add a new book to the inventory.
  - `PATCH /api/books/:id`: Update details of an existing book.
  - `DELETE /api/books/:id`: Delete a book from the inventory.
- **Category Browsing**
  - `GET /api/categories/:category`: Retrieve books by category.

 ## Development Process
The development process involved several key stages:
1. **Requirement Gathering**: Understanding the needs for managing a library's book inventory.
2. **Design**: Creating a user-friendly interface and planning the application architecture.
3. **Implementation**: Developing the front-end and back-end components.
4. **Testing**: Ensuring all functionalities work as expected and the user interface is responsive.
5. **Deployment**: Preparing the application for deployment on a web server.

## Setup and Installation
To set up and run the project locally, follow these steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jasminekayrabs/waad-ica-2024.git
   cd library-app
   ```
2. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Then, install the necessary dependencies:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   Start the development server:
   ```bash
   node server.js
   ```
4. **Access the Application**:
   Open your web browser and navigate to `http://localhost:3000` to access the application.

## Usage
### Librarian Functions
- **Register**: New librarians can register for an account.
- **Login**: Librarians can log in using their credentials.
- **Manage Books**: Add new books, update existing books, and delete books from the inventory.
- **Search or Browse by Categories**: View books filtered by specific categories.
- **Book Details**: View detailed information about a selected book.
  
## Project Evaluation
### Successes
- **User-Friendly Interface**: The application features a clean and intuitive interface, making it easy for users to navigate and perform tasks.
- **Responsive Design**: The pages are responsive and work well on various devices, including desktops and mobile devices.
- **Comprehensive Functionality**: All required features, such as book management and browsing, are implemented and functional.

### Challenges and Solutions

#### Challenge: Authentication Handling
**Issue**: Ensuring secure and seamless authentication for users.

**Solution**: Implemented JWT-based authentication. Stored the JWT in `sessionStorage` and used it for authenticating API requests.

#### Challenge: File Upload Handling
**Issue**: Handling book cover image uploads and displaying them correctly.

**Solution**: Used a combination of Alpine.js for handling file uploads on the client side and a file upload API endpoint to store images.

#### Challenge: Responsive Design
**Issue**: Making sure the application is usable on different screen sizes.

**Solution**: Utilized CSS Grid and Flexbox to create a responsive layout that adapts to various screen sizes.

## Conclusion
The K-Library Management System successfully meets the requirements for managing a library's book inventory. Despite some challenges during development, the application provides a robust and user-friendly solution for librarians and users alike.
