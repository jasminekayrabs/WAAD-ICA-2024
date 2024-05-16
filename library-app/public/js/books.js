// Librarian management clientside js

document.addEventListener('alpine:init', () => {
    Alpine.data('bookManager', () => ({
        newBook: {
            title: '',
            author: '',
            genre: '',
            cover_image: null,
            summary: ''
        },
        books: [],
        activeBook: null,

        init() {
            this.fetchBooks();
        },

        fetchBooks() {
            fetch('/api/books', {
                headers: {
                    'Authorization': sessionStorage.getItem('jwt')
                }
            })
            .then(response => response.json())
            .then(data => {
                this.books = data;
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
        },

        // triggerFileInput(book){
        //     this.activeBook = book; // Store the active book
        //     this.$refs.fileInput.click(); //Trigger the hidden fle input
        // },
       

        handleFileUpload(event){
            const file = event.target.files[0];
            if (file) {
                this.newBook.cover_image = file;
            }
        },
     


        addBook() {
            const formData = new FormData();
            Object.entries(this.newBook).forEach(([key, value]) => {
                formData.append(key, value instanceof File ? value : value.toString());
            });
        
            fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Authorization': sessionStorage.getItem('jwt'),
                },
                body: formData
            })
            .then(response => response.json())
            .then(() => {
                alert('Book added successfully');
                this.resetNewBook();
                this.fetchBooks();
            })
            .catch(error => {
                console.error('Error adding book:', error);
                alert(`Error adding book: ${error.message}`);
            });
        },
        
        updateBook(book) {
            const formData = new FormData();
            Object.keys(book).forEach(key => {
                if (book[key] !== null && book[key] !== undefined) {
                    formData.append(key, book[key]);
                }
            });
        
            fetch(`/api/books/${book.id}`, {
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': sessionStorage.getItem('jwt')
                }
            })
            .then(response => {
                if (!response.ok) throw new Error('Failed to update book');
                return response.json();
            })
            .then(() => {
                alert('Book updated successfully');
                this.fetchBooks(); // Refresh the list
            })
            .catch(error => {
                console.error('Error updating book:', error);
                alert('Error updating book: ' + error.message);
            });
        },

        deleteBook(id) {
            fetch(`/api/books/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': sessionStorage.getItem('jwt') }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete book: ${response.status}`);
                }
                return response.text(); 
            })
            .then(() => {
                alert('Book deleted successfully');
                this.books = this.books.filter(book => book.id !== id);  
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                alert('Error deleting book: ' + error.message);
            });
        },
        resetNewBook() {
            this.newBook = { title: '', author: '', genre: '', cover_image: null, summary: '' }; 
        },

        logout(){
            sessionStorage.removeItem('jwt');
            window.location.href = 'index.html'
        }
    }));
});


