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