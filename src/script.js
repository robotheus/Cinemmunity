// Seleciona os botões de login e cadastro
var btnLogin = document.getElementById('btn-login');
var btnCadastro = document.getElementById('btn-cadastro');

// Seleciona os formulários de login e cadastro
var formularioLogin = document.getElementById('formulario-login');
var formularioCadastro = document.getElementById('formulario-cadastro');

// Mostra o formulário de login ao passar o mouse sobre o botão de login
btnLogin.addEventListener('mouseover', function() {
    formularioLogin.style.display = 'block';
    formularioCadastro.style.display = 'none';
});

// Mostra o formulário de cadastro ao passar o mouse sobre o botão de cadastro
btnCadastro.addEventListener('mouseover', function() {
    formularioLogin.style.display = 'none';
    formularioCadastro.style.display = 'block';
});