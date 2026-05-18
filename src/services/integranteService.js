export async function buscarIntegrantes() {
    const resposta = await fetch('https://clubelivro-backend-zui4.onrender.com/api/equipe', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'livr0',
        },
    });

    if (!resposta.ok) {
        throw new Error('Erro ao buscar integrantes');
    }

    return await resposta.json();
}
