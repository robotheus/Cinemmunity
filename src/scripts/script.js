const loginBtn = document.getElementById('btn-login');
const cadastroBtn = document.getElementById('btn-cadastro');
const loginForm = document.getElementById('loginForm');
const cadastroForm = document.getElementById('cadastroForm');

class Usuario {
    constructor(nickname, numeroFilmes, numeroListas, numeroSeguindo, numeroSeguidores) {
        this.nickname = nickname;
        this.numeroFilmes = numeroFilmes;
        this.numeroListas = numeroListas;
        this.numeroSeguindo = numeroSeguindo;
        this.numeroSeguidores = numeroSeguidores;
    }
}

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
            
            window.location.href = "perfil?nickname=" + encodeURIComponent(nickname);
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

function getUsuarioLogado() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('nickname');
}

async function buscarUsuarios() {
    const username = document.getElementById("username").value;
    const urlParams = new URLSearchParams(window.location.search);

    try {
        const response = await fetch('/buscar-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nickname: username })
        });

        const data = await response.json();

        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "";

        if (response.ok) {
            resultDiv.innerHTML = `<p>Usuário encontrado: ${data.nickname}</p>`;

            const seguirBtn = document.createElement("button");
            seguirBtn.style.cssText = "background: #00b300; color: #ffffff; padding: 8px 16px; border-radius: 5px; border: none; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 20px;";
            seguirBtn.textContent = "Seguir";
            
            const deixarSeguirBtn = document.createElement("button");
            deixarSeguirBtn.textContent = "Deixar de Seguir";
            deixarSeguirBtn.style.cssText = "background: #b30600; color: #ffffff; padding: 8px 16px; border-radius: 5px; border: none; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 20px;";
           
            seguirBtn.onclick = async () => {
                const followedUserNickname = data.nickname; // nickname do usuário seguido
                const followerUserId = urlParams.get('nickname'); // nickname do usuário logado
            
                try {
                    const response = await fetch('/seguir-usuario', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ followedUser: followedUserNickname, followerUserId: followerUserId })
                    });
            
                    const responseData = await response.json();
            
                    if (response.ok) {
                        alert(responseData.message);
                    } else {
                        alert(responseData.message);
                    }
                } catch (error) {
                    console.error('Erro:', error);
                }
            };
            resultDiv.appendChild(seguirBtn);
 
            deixarSeguirBtn.onclick = async () => {
                const followedUserNickname = data.nickname; // nickname do usuário seguido
                const followerUserId = urlParams.get('nickname'); // nickname do usuário logado
            
                try {
                    const response = await fetch('/deixar-seguir-usuario', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ followedUser: followedUserNickname, followerUserId: followerUserId })
                    });
            
                    const responseData = await response.json();
            
                    if (response.ok) {
                        alert(responseData.message);
                    } else {
                        alert(responseData.message);
                    }
                } catch (error) {
                    console.error('Erro:', error);
                }
            };
            resultDiv.appendChild(deixarSeguirBtn);
        } else {
            resultDiv.innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

function sair() {
    window.location.href = "/";
}