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
    const registerForm = document.querySelector('#register-form');
    console.log("ok");
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // Xử lí logic đăng nhập ở đây
        const email = loginForm.elements.email.value;
        const password = loginForm.elements.password.value;
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
            window.location.href = '/';
        }
    });

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // Xử lí logic đăng nhập ở đây
        const name = registerForm.elements.name.value;
        const email = registerForm.elements.email.value;
        const password = registerForm.elements.password.value;

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message_register);
        } else {
            alert(data.message_register);
            window.location.href = '/';
        }
    })
});