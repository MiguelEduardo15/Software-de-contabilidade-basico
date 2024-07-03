document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const senha = document.getElementById('loginPassword').value;

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuario = usuarios.find(user => user.email === email && user.senha === senha);

            if (usuario) {
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                alert('Login bem-sucedido!');
                window.location.href = 'index.html';
            } else {
                alert('Email ou senha incorretos.');
            }
        });
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('cadastroNome').value;
            const email = document.getElementById('cadastroEmail').value;
            const senha = document.getElementById('cadastroPassword').value;

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioExistente = usuarios.find(user => user.email === email);

            if (usuarioExistente) {
                alert('Usuário já cadastrado com este email.');
            } else {
                usuarios.push({ nome, email, senha });
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                alert('Cadastro realizado com sucesso!');
                window.location.href = 'login.html';
            }
        });
    }

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        document.getElementById('nomeUsuario').innerText = usuarioLogado.nome;
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('usuarioLogado');
            alert('Logout bem-sucedido!');
            window.location.href = 'login.html';
        });
    }
});
