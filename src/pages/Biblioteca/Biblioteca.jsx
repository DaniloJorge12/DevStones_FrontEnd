import { useEffect, useState } from 'react';
import FiltrosBiblioteca from '../../components/Biblioteca/FiltrosBiblioteca.jsx';
import GradeLivros from '../../components/Biblioteca/GradeLivros.jsx';
import TopoBiblioteca from '../../components/Biblioteca/TopoBiblioteca.jsx';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import './Biblioteca.css';

const fontesBiblioteca = [
    {
        nome: 'DevStones',
        url: 'https://devstones-backend.onrender.com/api/livro',
        apiKey: 'livr0',
    },
    {
        nome: 'Entre Linhas',
        url: 'https://clubelivro-backend.onrender.com/api/livros',
        apiKey: 'entreLinhas123',
    },
    {
        nome: 'Menino Grande',
        url: 'https://atividade-portugues-backend.onrender.com/api/livro',
        apiKey: 'chaveSecreta',
    },
    {
        nome: 'Os Ratos',
        url: 'https://ratsjs.onrender.com/api/livros',
        apiKey: 'Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO',
    },
];

function extrairListaLivros(dados) {
    if (Array.isArray(dados)) {
        return dados;
    }

    return dados?.data || dados?.livros || dados?.results || dados?.books || [];
}

function normalizarLivro(livro, fonteNome) {
    const id =
        livro.id ||
        livro._id ||
        livro.idLivro ||
        livro.bookId ||
        `${fonteNome}-${livro.titulo || livro.autor || livro.categoria || Math.random().toString(36).slice(2)}`;

    return {
        id,
        titulo: livro.titulo || livro.nome || livro.nomeLivro || 'Livro sem título',
        autor: livro.autor || livro.autorNome || 'Autor desconhecido',
        categoria: livro.genero || livro.categoria || livro.tipo || 'Literatura',
        destaque: livro.anoPublicacao
            ? String(livro.anoPublicacao)
            : livro.genero || livro.categoria || 'Livro',
        imagem: livro.capa || livro.imagem || '/src/assets/img/book.png',
        resumo: livro.resumo || livro.descricao || livro.sinopse || '',
        anoPublicacao: livro.anoPublicacao,
        fonte: fonteNome,
        original: livro,
    };
}

function dedupeLivros(livros) {
    const mapa = new Map();
    livros.forEach((livro) => {
        const chave = `${livro.id}::${livro.fonte}`;
        if (!mapa.has(chave)) {
            mapa.set(chave, livro);
        }
    });
    return Array.from(mapa.values());
}

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
            return (
                String(livro.destaque ?? '')
                    .toLowerCase()
                    .includes('mais') || indice < 4
            );
        }

        if (filtroAtivo === 'recentes') {
            return indice >= Math.max(0, livros.length - 4);
        }

        if (filtroAtivo === 'favoritos') {
            return ['favorito', 'literatura', 'foco total'].some((termo) =>
                String(livro.destaque ?? '')
                    .toLowerCase()
                    .includes(termo)
            );
        }

        return true;
    });
}

export default function Biblioteca({ usuario, aoSair }) {
    const { idioma } = useIdioma();
    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [busca, setBusca] = useState('');
    const [filtroAtivo, setFiltroAtivo] = useState('todos');

    const textos = {
        pt: {
            menuItem: 'Biblioteca',
            carregando: 'Carregando livros...',
            nenhum: 'Nenhum livro encontrado com esses filtros.',
            erroGeral: 'Não foi possível carregar os livros.',
            falhas: 'Algumas fontes não responderam: ',
            todos: 'Todos',
            populares: 'Mais populares',
            recentes: 'Mais recentes',
            favoritos: 'Favoritos'
        },
        en: {
            menuItem: 'Library',
            carregando: 'Loading books...',
            nenhum: 'No books found with these filters.',
            erroGeral: 'Could not load books.',
            falhas: 'Some sources did not respond: ',
            todos: 'All',
            populares: 'Most popular',
            recentes: 'Most recent',
            favoritos: 'Favorites'
        }
    };
    const t = textos[idioma] || textos.pt;

    const filtros = [
        { valor: 'todos', rotulo: t.todos },
        { valor: 'populares', rotulo: t.populares },
        { valor: 'recentes', rotulo: t.recentes },
        { valor: 'favoritos', rotulo: t.favoritos },
    ];

    useEffect(() => {
        let ativo = true;

        async function buscarFonte(fonte) {
            const resposta = await fetch(fonte.url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': fonte.apiKey,
                },
            });

            if (!resposta.ok) {
                throw new Error(`Erro na fonte ${fonte.nome}`);
            }

            const dados = await resposta.json();
            const lista = extrairListaLivros(dados);
            return lista.map((livro) => normalizarLivro(livro, fonte.nome));
        }

        async function carregarLivros() {
            try {
                setCarregando(true);
                setErro('');

                const resultados = await Promise.allSettled(
                    fontesBiblioteca.map((fonte) => buscarFonte(fonte))
                );

                const falhas = resultados
                    .filter((item) => item.status === 'rejected')
                    .map((item) => item.reason?.message || 'Fonte indisponível');

                const livrosCarregados = resultados
                    .filter((item) => item.status === 'fulfilled')
                    .flatMap((item) => item.value);

                if (ativo) {
                    setLivros(dedupeLivros(livrosCarregados));
                    if (falhas.length > 0) {
                        setErro(`${t.falhas}${falhas.join(', ')}`);
                    }
                }
            } catch (error) {
                if (ativo) {
                    setErro(error.message || t.erroGeral);
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
    }, [idioma]);

    const livrosVisiveis = filtrarLivros(livros, filtroAtivo, busca);

    return (
        <div className='paginaBiblioteca'>
            <MenuLateral itemAtivo={t.menuItem} aoSair={aoSair} />

            <div className='conteudoBiblioteca'>
                <Cabecalho usuario={usuario} aoSair={aoSair} />

                <main className='areaBiblioteca'>
                    <div className='conteudoBibliotecaInterno'>
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

                        {carregando ? (
                            <div className='estadoBiblioteca'>{t.carregando}</div>
                        ) : (
                            <>
                                {erro && <div className='estadoBiblioteca'>{erro}</div>}
                                {livrosVisiveis.length > 0 ? (
                                    <GradeLivros livros={livrosVisiveis} />
                                ) : (
                                    <div className='estadoBiblioteca'>{t.nenhum}</div>
                                )}
                            </>
                        )}
                    </div>
                </main>

                <Rodape />
            </div>
        </div>
    );
}
