document.addEventListener('alpine:init', () => {
    Alpine.data('categoryBooks', () => {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            query: '',
            category: urlParams.get('category') || 'Fiction',
            books: [],

            fetchCategoryBooks() {
                fetch(`/api/books?category=${encodeURIComponent(this.category)}`)
                    .then(response => {
                        if (!response.ok) throw new Error(`Failed to fetch books: ${response.status}`);
                        return response.json();
                    })
                    .then(data => {
                        this.books = data;
                    })
                    .catch(error => {
                        console.error('Error fetching books:', error);
                        alert('Failed to fetch books due to server error');
                    });
            }
        };
    });
});