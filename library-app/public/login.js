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
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    // Save the token to localStorage
                    localStorage.setItem('jwt', data.token);
                    alert('Login Successful: ' + data.message);
                    // redirect the user or refresh the page -will decide later
                    // window.location.href = '/some-secured-page.html';
                } else {
                    alert('Login Failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login Failed');
            });
        }
    }));
});