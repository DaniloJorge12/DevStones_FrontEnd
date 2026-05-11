function normalizarLivro(livro) {
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
    categoria: livro.genero || 'Literatura',
    destaque: livro.anoPublicacao ? String(livro.anoPublicacao) : livro.genero || 'Livro',
    imagem: livro.capa,
    resumo: livro.resumo,
    anoPublicacao: livro.anoPublicacao,
    original: livro,
  };
}

export async function buscarLivrosBiblioteca() {
  const baseUrl = import.meta.env.VITE_API_BIBLIOTECA_URL;

  if (!baseUrl) {
    return [];
  }

  const apiKey = import.meta.env.VITE_API_KEY;
  const resposta = await fetch(`${baseUrl.replace(/\/$/, '')}/api/livro`, {
    headers: apiKey ? { 'x-api-key': apiKey } : undefined,
  });

  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os livros da biblioteca.');
  }

  const dados = await resposta.json();
  const lista = Array.isArray(dados) ? dados : dados?.data || [];

  return lista.map(normalizarLivro);
}
