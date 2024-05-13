function bookManager() {
    return {
        newBook: { title: '', author: '', genre: '' },
        books: [],
        init() {
            this.fetchBooks();
        },
        fetchBooks() {
            fetch('/api/books', {
                headers: { 
                    'Authorization': sessionStorage.getItem('jwt'),
                    'Cache-Control': 'no-cache'
                }
            })
            .then(response => {
                if (!response.ok) {
                    response.text().then(text => console.log(text));
                    throw new Error('Failed to fetch books: ${response.status}');
                }
                return response.json();
            })
            .then(data => {
                console.log("Books fetched:", this.bo)
                this.books = data;
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
        },
        addBook() {
            console.log(JSON.stringify(this.newBook));
            fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('jwt')
                },
                body: JSON.stringify(this.newBook)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add book: ${response.status}');
                }
                return response.json();
            })
            .then(() => {
                alert('Book added successfully');
                this.newBook = { title: '', author: '', genre: '' }; // Reset form
                this.fetchBooks(); // Reload the list
            })
            .catch(error => {
                console.error('Error adding book:', error);
                alert('Error adding book');
            });
        },
        updateBook(book) {
            fetch(`/api/books/${book.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('jwt')
                },
                body: JSON.stringify({ title: book.title, author: book.author, genre: book.genre })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update book');
                }
                return response.json();
            })
            .then(() => {
                alert('Book updated successfully');
                this.fetchBooks(); // Refresh the list
            })
            .catch(error => {
                console.error('Error updating book:', error);
                alert('Error updating book');
            });
        },
        deleteBook(id) {
            fetch(`/api/books/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': sessionStorage.getItem('jwt') }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete book');
                }
                alert('Book deleted successfully');
                this.books = this.books.filter(book => book.id !== id); // Update the list locally
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                alert('Error deleting book');
            });
        }
    }
}