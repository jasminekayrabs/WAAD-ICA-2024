document.addEventListener('alpine:init', () => {
    Alpine.data('registerForm', () => ({
        username: '',
        password: '',
        init() {
            console.log('Register form component is initialized');
        },
        submit() {
            fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.username, password: this.password })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(text => { throw new Error(text) });
                }
            })
            .then(data => {
                alert('Registration successful: ' + data.message);
                
            })
            .catch(error => {
                console.error('Registration Failed:', error);
                alert('Registration Failed: ' + error.message);
            });
        }
    }));
});