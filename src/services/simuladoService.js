const API = 'https://clubelivro-backend-zui4.onrender.com';

export async function buscarSimulados() {
    const resposta = await fetch(`${API}/api/simulados`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'livr0',
        },
    });

    if (!resposta.ok) {
        throw new Error('Não foi possível carregar os simulados.');
    }

    return await resposta.json();
}

export async function buscarLivros() {
    const resposta = await fetch(`${API}/api/livro`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'livr0',
        },
    });

    if (!resposta.ok) {
        throw new Error('Não foi possível carregar os livros.');
    }

    return await resposta.json();
}