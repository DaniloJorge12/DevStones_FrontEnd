const API = 'https://devstones-backend.onrender.com';

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

export async function gerarQuestoesIA(tema, quantidade = 5) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90_000);

    try {
        const resposta = await fetch(
            `${API}/api/simulados/gerar-questoes?tema=${encodeURIComponent(tema)}&quantidade=${quantidade}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'livr0',
                },
                signal: controller.signal,
            }
        );

        if (!resposta.ok) {
            let detalhes = '';
            try {
                const corpo = await resposta.json();
                detalhes = corpo?.error || corpo?.message || '';
            } catch (_) {}
            throw new Error(
                detalhes || `Erro ${resposta.status} ao gerar questões com IA.`
            );
        }

        return await resposta.json();
    } catch (erro) {
        if (erro.name === 'AbortError') {
            throw new Error(
                'O servidor demorou demais para responder (pode estar acordando). Tente novamente em alguns segundos.'
            );
        }
        throw erro;
    } finally {
        clearTimeout(timeoutId);
    }
}
