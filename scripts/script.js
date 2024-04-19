const loginBtn = document.getElementById('btn-login');
const cadastroBtn = document.getElementById('btn-cadastro');
const loginForm = document.getElementById('loginForm');
const cadastroForm = document.getElementById('cadastroForm');

loginBtn.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    cadastroForm.classList.add('hidden');
});

cadastroBtn.addEventListener('click', () => {
    cadastroForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

document.getElementById('loginSubmit').addEventListener('click', async () => {
    const nickname = document.getElementById('nicknamelog').value;
    const senha = document.getElementById('senhalog').value;

    alert("Login realizado!");
    window.location.href = "html/timeline.html";
    document.getElementById('nicknamelog').value = '';
    document.getElementById('senhalog').value = '';
});

document.getElementById('cadastroSubmit').addEventListener('click', async () => {
    const nickname = document.getElementById('nickname').value;
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;

    alert("Cadastro realizado");

    document.getElementById('nickname').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('email').value = '';
});
    
document.getElementById('botao-sair').addEventListener('click', async () => {
    window.location.href = "../index.html";
});