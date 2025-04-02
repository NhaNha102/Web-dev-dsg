// Auth.js
document.addEventListener('DOMContentLoaded', () => {
    // Login Form Validation
    if (window.location.pathname.includes('Login.html')) {
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            let isValid = true;

            // Reset errors
            document.getElementById('email-error').textContent = '';
            document.getElementById('password-error').textContent = '';

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                document.getElementById('email-error').textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = 'Invalid email format';
                isValid = false;
            }

            // Validate password
            if (!password) {
                document.getElementById('password-error').textContent = 'Password is required';
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('password-error').textContent = 'Password must be at least 6 characters';
                isValid = false;
            }

            if (isValid) {
                // Giả lập đăng nhập thành công
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('currentEmail', email);
                showNotification('Login successful!', () => {
                    window.location.href = '../HTML/MainPage.html';
                });
            }
        });
    }

    // Register Form Validation
    if (window.location.pathname.includes('Register.html')) {
        const registerForm = document.getElementById('register-form');
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();
            let isValid = true;

            // Reset errors
            document.getElementById('name-error').textContent = '';
            document.getElementById('email-error').textContent = '';
            document.getElementById('password-error').textContent = '';
            document.getElementById('confirm-password-error').textContent = '';

            // Validate name
            if (!name) {
                document.getElementById('name-error').textContent = 'Name is required';
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                document.getElementById('email-error').textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = 'Invalid email format';
                isValid = false;
            }

            // Validate password
            if (!password) {
                document.getElementById('password-error').textContent = 'Password is required';
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('password-error').textContent = 'Password must be at least 6 characters';
                isValid = false;
            }

            // Validate confirm password
            if (!confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Confirm password is required';
                isValid = false;
            } else if (password !== confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Passwords do not match';
                isValid = false;
            }

            if (isValid) {
                // Giả lập đăng ký thành công
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('currentEmail', email);
                localStorage.setItem('userName', name);
                showNotification('Registration successful!', () => {
                    window.location.href = '../HTML/MainPage.html';
                });
            }
        });
    }
});