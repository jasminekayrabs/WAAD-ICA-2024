document.addEventListener('alpine:init', () => {
    Alpine.data('bookApp', () => ({
        search: '',
        books: [],
        searchPerformed: false,

        init(){
            // Initial setup can also fetch some default or popular books if needed
            // this.fetchBooks();  // Optionally fetch all books initially
        },

        fetchBooks() {
            this.searchPerformed = true;
            const query = this.search ? `?query=${encodeURIComponent(this.search)}` : '';
            fetch(`/books${query}`)
                .then(response => response.json())
                .then(data => {
                    this.books = data;
                })
                .catch(error => {
                    console.error('Error loading the books:', error);
                });
        }
    }));
});
