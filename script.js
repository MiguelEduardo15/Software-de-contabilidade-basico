document.getElementById('btnDespesas').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <h2>Registrar Despesas</h2>
        <form id="formDespesas">
            <label for="descricaoDespesa">Descrição:</label>
            <input type="text" id="descricaoDespesa" name="descricaoDespesa" required>
            <label for="valorDespesa">Valor:</label>
            <input type="number" id="valorDespesa" name="valorDespesa" required>
            <label for="dataDespesa">Data:</label>
            <input type="date" id="dataDespesa" name="dataDespesa" required>
            <button type="submit">Registrar Despesa</button>
        </form>
        <table id="tabelaDespesas">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;
    carregarDespesas();
    document.getElementById('formDespesas').addEventListener('submit', function(e) {
        e.preventDefault();
        const descricao = document.getElementById('descricaoDespesa').value;
        const valor = document.getElementById('valorDespesa').value;
        const data = document.getElementById('dataDespesa').value;
        registrarDespesa(descricao, valor, data);
        carregarDespesas();
        alert('Despesa registrada com sucesso!');
    });
});

document.getElementById('btnReceitas').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <h2>Registrar Receitas</h2>
        <form id="formReceitas">
            <label for="descricaoReceita">Descrição:</label>
            <input type="text" id="descricaoReceita" name="descricaoReceita" required>
            <label for="valorReceita">Valor:</label>
            <input type="number" id="valorReceita" name="valorReceita" required>
            <label for="dataReceita">Data:</label>
            <input type="date" id="dataReceita" name="dataReceita" required>
            <button type="submit">Registrar Receita</button>
        </form>
        <table id="tabelaReceitas">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;
    carregarReceitas();
    document.getElementById('formReceitas').addEventListener('submit', function(e) {
        e.preventDefault();
        const descricao = document.getElementById('descricaoReceita').value;
        const valor = document.getElementById('valorReceita').value;
        const data = document.getElementById('dataReceita').value;
        registrarReceita(descricao, valor, data);
        carregarReceitas();
        alert('Receita registrada com sucesso!');
    });
});

document.getElementById('btnRelatorios').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <h2>Gerar Relatórios</h2>
        <button id="gerarRelatorio">Gerar Relatório</button>
        <div id="relatorio"></div>
    `;
    document.getElementById('gerarRelatorio').addEventListener('click', function() {
        gerarRelatorio();
    });
});

function registrarDespesa(descricao, valor, data) {
    const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    despesas.push({ descricao, valor, data });
    localStorage.setItem('despesas', JSON.stringify(despesas));
}

function carregarDespesas() {
    const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    const tabela = document.getElementById('tabelaDespesas').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';
    despesas.forEach(despesa => {
        const row = tabela.insertRow();
        row.insertCell(0).innerText = despesa.descricao;
        row.insertCell(1).innerText = despesa.valor;
        row.insertCell(2).innerText = despesa.data;
    });
}

function registrarReceita(descricao, valor, data) {
    const receitas = JSON.parse(localStorage.getItem('receitas')) || [];
    receitas.push({ descricao, valor, data });
    localStorage.setItem('receitas', JSON.stringify(receitas));
}

function carregarReceitas() {
    const receitas = JSON.parse(localStorage.getItem('receitas')) || [];
    const tabela = document.getElementById('tabelaReceitas').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';
    receitas.forEach(receita => {
        const row = tabela.insertRow();
        row.insertCell(0).innerText = receita.descricao;
        row.insertCell(1).innerText = receita.valor;
        row.insertCell(2).innerText = receita.data;
    });
}

function gerarRelatorio() {
    const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    const receitas = JSON.parse(localStorage.getItem('receitas')) || [];
    let totalDespesas = 0;
    let totalReceitas = 0;

    despesas.forEach(despesa => totalDespesas += parseFloat(despesa.valor));
    receitas.forEach(receita => totalReceitas += parseFloat(receita.valor));

    const saldo = totalReceitas - totalDespesas;
    document.getElementById('relatorio').innerHTML = `
        <h3>Relatório Financeiro</h3>
        <p>Total de Despesas: R$ ${totalDespesas.toFixed(2)}</p>
        <p>Total de Receitas: R$ ${totalReceitas.toFixed(2)}</p>
        <p>Saldo: R$ ${saldo.toFixed(2)}</p>
    `;
}

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
