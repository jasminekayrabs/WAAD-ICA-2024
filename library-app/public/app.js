document.addEventListener('alpine:init', () => {
    Alpine.data('bookSearch', () => ({
        query: '',
        books: [],

        init() {
            // This function is called when the component is initialized
            console.log('Book search component initialized');
        },

        fetchBooks() {
            if (!this.query.trim()) {
                this.books = [];
                this.searchPerformed = false;
                return;
            }
            this.searchPerformed = true;
            fetch(`/api/books?query=${encodeURIComponent(this.query)}`)
                .then(response => response.json())
                .then(data => {
                    this.books = data;
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                    this.books = []; // Reset the book list on error
                });
        }
    }));
});
