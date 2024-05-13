document.addEventListener('alpine:init', () => {
    Alpine.data('loginForm', () => ({
        username: '',
        password: '',
        submit() {
            fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    // Save the token to localStorage
                   sessionStorage .setItem('jwt', data.token);
                    alert('Login Successful: ' + data.message);
                    // Redirect to books.html upon successful login
                    window.location.href = '/books.html';
                } else {
                    alert('Login Failed: Please check your credentials and try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login Failed: ' + error.message);
            });
        }
    }));
});
