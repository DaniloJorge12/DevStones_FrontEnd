const API = 'https://devstones-backend.onrender.com';
const API_KEY = 'livr0';

function obterMensagemErro(dados, fallback) {
    return dados?.error || dados?.message || fallback;
}

async function lerResposta(resposta, fallback) {
    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok) {
        throw new Error(obterMensagemErro(dados, fallback));
    }

    return dados?.data ?? dados;
}

export async function buscarPublicacoesComunidade() {
    const resposta = await fetch(`${API}/api/comunidade`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    });

    if (resposta.status === 400) {
        const dados = await resposta.json().catch(() => null);
        if (dados?.message?.toLowerCase().includes('nenhuma')) {
            return [];
        }
    }

    const dados = await lerResposta(resposta, 'Nao foi possivel carregar as publicacoes.');
    return Array.isArray(dados) ? dados : [];
}

export async function criarPublicacaoComunidade(publicacao) {
    const resposta = await fetch(`${API}/api/comunidade`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify(publicacao),
    });

    return lerResposta(resposta, 'Nao foi possivel criar a publicacao.');
}

export async function atualizarPublicacaoComunidade(id, publicacao) {
    const resposta = await fetch(`${API}/api/comunidade/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify(publicacao),
    });

    return lerResposta(resposta, 'Nao foi possivel atualizar a publicacao.');
}

export async function deletarPublicacaoComunidade(id) {
    const resposta = await fetch(`${API}/api/comunidade/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    });

    return lerResposta(resposta, 'Nao foi possivel excluir a publicacao.');
}
