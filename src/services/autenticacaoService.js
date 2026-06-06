const API = 'https://devstones-backend.onrender.com';

export async function entrarNaConta({ identificador, senha }) {
    const resposta = await fetch(`${API}/api/usuario`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'livr0',
        },
    });

    if (!resposta.ok) {
        throw new Error('Não foi possível conectar ao servidor.');
    }

    const usuarios = await resposta.json();
    const lista = Array.isArray(usuarios) ? usuarios : usuarios?.data ?? [];

    const campo = identificador.includes('@') ? 'email' : 'username';
    const encontrado = lista.find(
        (u) => u[campo]?.toLowerCase() === identificador.toLowerCase().trim()
    );

    if (!encontrado) {
        throw new Error('Usuário não encontrado.');
    }

    if (encontrado.senha !== senha) {
        throw new Error('Senha incorreta.');
    }

    return encontrado;
}

export async function criarContaUsuario(dadosUsuario) {
    const resposta = await fetch(`${API}/api/usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'livr0',
        },
        body: JSON.stringify(dadosUsuario),
    });

    if (!resposta.ok) {
        const dados = await resposta.json().catch(() => null);
        throw new Error(dados?.error || dados?.message || 'Não foi possível criar a conta.');
    }

    const dados = await resposta.json();
    return dados?.data ?? dados;
}
