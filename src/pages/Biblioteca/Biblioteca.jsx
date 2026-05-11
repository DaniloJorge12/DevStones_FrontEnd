import { useEffect, useState } from 'react';
import './Biblioteca.css';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import TopoBiblioteca from '../../components/Biblioteca/TopoBiblioteca.jsx';
import FiltrosBiblioteca from '../../components/Biblioteca/FiltrosBiblioteca.jsx';
import GradeLivros from '../../components/Biblioteca/GradeLivros.jsx';
import { buscarLivrosBiblioteca } from '../../services/bibliotecaService.js';

const filtros = [
  { valor: 'todos', rotulo: 'Todos' },
  { valor: 'populares', rotulo: 'Mais populares' },
  { valor: 'recentes', rotulo: 'Mais recentes' },
  { valor: 'favoritos', rotulo: 'Favoritos' },
];

function filtrarLivros(livros, filtroAtivo, busca) {
  const buscaNormalizada = busca.trim().toLowerCase();

  return livros.filter((livro, indice) => {
    const correspondeBusca =
      !buscaNormalizada ||
      [livro.titulo, livro.autor, livro.categoria, livro.resumo, livro.destaque]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(buscaNormalizada);

    if (!correspondeBusca) {
      return false;
    }

    if (filtroAtivo === 'todos') {
      return true;
    }

    if (filtroAtivo === 'populares') {
      return String(livro.destaque ?? '').toLowerCase().includes('mais') || indice < 4;
    }

    if (filtroAtivo === 'recentes') {
      return indice >= Math.max(0, livros.length - 4);
    }

    if (filtroAtivo === 'favoritos') {
      return ['favorito', 'literatura', 'foco total'].some((termo) =>
        String(livro.destaque ?? '').toLowerCase().includes(termo)
      );
    }

    return true;
  });
}

export default function Biblioteca({ usuario, aoSair }) {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const backendConfigurado = Boolean(import.meta.env.VITE_API_BIBLIOTECA_URL);

  useEffect(() => {
    let ativo = true;

    async function carregarLivros() {
      try {
        setCarregando(true);
        setErro('');
        const resultado = await buscarLivrosBiblioteca();

        if (ativo) {
          setLivros(resultado);
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || 'Não foi possível carregar os livros.');
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarLivros();

    return () => {
      ativo = false;
    };
  }, []);

  const livrosVisiveis = filtrarLivros(livros, filtroAtivo, busca);

  return (
    <div className="paginaBiblioteca">
      <MenuLateral itemAtivo="Biblioteca" aoSair={aoSair} />

      <div className="conteudoBiblioteca">
        <Cabecalho usuario={usuario} aoSair={aoSair} />

        <main className="areaBiblioteca">
          <div className="conteudoBibliotecaInterno">
            <TopoBiblioteca
              totalLivros={livrosVisiveis.length}
              valorBusca={busca}
              aoMudarBusca={(evento) => setBusca(evento.target.value)}
            />

            <FiltrosBiblioteca
              filtros={filtros.map((filtro) => ({
                ...filtro,
                total:
                  filtro.valor === 'todos'
                    ? livros.length
                    : filtrarLivros(livros, filtro.valor, busca).length,
              }))}
              filtroAtivo={filtroAtivo}
              aoSelecionarFiltro={setFiltroAtivo}
            />

            {erro ? (
              <div className="estadoBiblioteca">{erro}</div>
            ) : carregando ? (
              <div className="estadoBiblioteca">Carregando livros...</div>
            ) : !backendConfigurado ? (
              <div className="estadoBiblioteca">
                Biblioteca pronta para o backend. Quando você definir o link em
                VITE_API_BIBLIOTECA_URL, os livros aparecem aqui automaticamente.
              </div>
            ) : livrosVisiveis.length > 0 ? (
              <GradeLivros livros={livrosVisiveis} />
            ) : (
              <div className="estadoBiblioteca">Nenhum livro encontrado com esses filtros.</div>
            )}
          </div>
        </main>

        <Rodape />
      </div>
    </div>
  );
}