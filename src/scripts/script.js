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

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nickname, senha })
        });

        if (response.ok) {
            const data = await response.text();
            alert(data);
            window.location.href = "perfil";
        } else {
            const data = await response.text();
            alert(data);
        }
    } catch (err) {
        console.error(err);
    }
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
            alert(data);

            document.getElementById('nickname').value = '';
            document.getElementById('senha').value = '';
            document.getElementById('email').value = '';
        } else {
            const data = await response.text();
            alert(data);
        }
    } catch (err) {
        console.error(err);
    }
});