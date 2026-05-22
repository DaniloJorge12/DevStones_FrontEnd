const API = 'https://clubelivro-backend-zui4.onrender.com';

function obterExtensaoMaterial(material = '') {
    const caminho = material.split('?')[0].toLowerCase();

    if (caminho.endsWith('.mp4')) return 'video';
    if (caminho.endsWith('.pdf')) return 'pdf';

    return 'material';
}

function normalizarConteudo(conteudo) {
    const tipoNormalizado = obterExtensaoMaterial(conteudo.material);

    return {
        id: conteudo.id,
        idDoLivro: conteudo.idDoLivro,
        titulo: conteudo.dicaTitulo || 'Conteudo sem titulo',
        tituloEn: conteudo.dicaTitulo_en || conteudo.dicaTitulo || 'Untitled content',
        tipo: conteudo.tipo,
        tipoEn: conteudo.tipo_en || conteudo.tipo,
        tipoMaterial: tipoNormalizado,
        descricao: conteudo.descricaoDica || '',
        descricaoEn: conteudo.descricaoDica_en || conteudo.descricaoDica || '',
        curtidas: conteudo.curtidasDica || 0,
        material: conteudo.material,
        original: conteudo,
    };
}

export async function buscarConteudos() {
    const resposta = await fetch(`${API}/api/conteudos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'livr0',
        },
    });

    if (!resposta.ok) {
        throw new Error('Nao foi possivel carregar os conteudos.');
    }

    const dados = await resposta.json();
    const lista = Array.isArray(dados) ? dados : dados?.data || [];

    return lista.map(normalizarConteudo);
}
