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

document.getElementById('loginSubmit').addEventListener('click', () => {
    // Lógica para fazer login
});

document.getElementById('cadastroSubmit').addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value;
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;

    // Enviar os dados para o servidor
    fetch('/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname, senha, email })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('nickname').value = '';
        document.getElementById('senha').value = '';
        document.getElementById('email').value = '';

        const mensagemCadastro = document.getElementById('cadastroMsg');
        mensagemCadastro.textContent = data.message;
        mensagemCadastro.classList.remove('hidden');
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});