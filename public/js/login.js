const signUpButton = document.getElementById('forward-signUp');
const signInButton = document.getElementById('forward-signIn');
const container = document.getElementById('container');
const login = document.getElementById('login');
const register = document.getElementById('register');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

login.addEventListener('click', () => {
    console.log("login");
})

register.addEventListener('click', () => {
    console.log("register");
})

document.addEventListener('DOMContentLoaded', (req, res) => {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // Xử lí logic đăng nhập ở đây
        const email = loginForm.elements.email.value;
        const password = loginForm.elements.password.value;

        console.log(email + " " + password);
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });


        const data = await response.json();

        if (!response.ok) {
            alert(data.message_login);
        } else {
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        }
    });
});