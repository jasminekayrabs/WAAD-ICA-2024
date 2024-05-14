document.addEventListener('alpine:init', () => {
    Alpine.data('bookDetails', () => {
        return {
            book: {},
            fetchBookDetails() {
                const bookId = new URLSearchParams(window.location.search).get('id');
                fetch(`/api/books/${bookId}`)
                    .then(response => {
                        if (!response.ok) throw new Error('Failed to fetch book details');
                        return response.json();
                    })
                    .then(data => {
                        this.book = data;
                    })
                    .catch(error => {
                        console.error('Error fetching book details:', error);
                    });
            }
        };
    });
});
