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
    const nickname = document.getElementById('nickname').value;
    const senha = document.getElementById('senha').value;
});

document.getElementById('cadastroSubmit').addEventListener('click', async () => {
    const nickname = document.getElementById('nickname').value;
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nickname, senha, email })
        });

        if (response.ok) {
            const data = await response.text();
            document.getElementById('nickname').value = '';
            document.getElementById('senha').value = '';
            document.getElementById('email').value = '';
            
            alert('Cadastro realizado com sucesso!');
        } else {
            alert('ERRO de cadastro!');
        }
    } catch (err) {
        console.error(err);
    }
});

