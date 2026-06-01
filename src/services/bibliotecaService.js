const API = 'https://devstones-backend.onrender.com';
const API_KEY = 'livr0';

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
  const resposta = await fetch(`${API}/api/livro`, {
    headers: { 'x-api-key': API_KEY },
  });

  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os livros da biblioteca.');
  }

  const dados = await resposta.json();
  const lista = Array.isArray(dados) ? dados : dados?.data || [];

  return lista.map(normalizarLivro);
}
