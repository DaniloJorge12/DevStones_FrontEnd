import { useEffect, useState } from 'react';
import FiltrosBiblioteca from '../../components/Biblioteca/FiltrosBiblioteca.jsx';
import GradeLivros from '../../components/Biblioteca/GradeLivros.jsx';
import TopoBiblioteca from '../../components/Biblioteca/TopoBiblioteca.jsx';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import './Biblioteca.css';

const filtros = [
    { valor: 'todos', rotulo: 'Todos' },
    { valor: 'populares', rotulo: 'Mais populares' },
    { valor: 'recentes', rotulo: 'Mais recentes' },
    { valor: 'favoritos', rotulo: 'Favoritos' },
];

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
    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [busca, setBusca] = useState('');
    const [filtroAtivo, setFiltroAtivo] = useState('todos');

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
                        setErro(`Algumas fontes não responderam: ${falhas.join(', ')}`);
                    }
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
        <div className='paginaBiblioteca'>
            <MenuLateral itemAtivo='Biblioteca' aoSair={aoSair} />

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
                            <div className='estadoBiblioteca'>Carregando livros...</div>
                        ) : (
                            <>
                                {erro && <div className='estadoBiblioteca'>{erro}</div>}
                                {livrosVisiveis.length > 0 ? (
                                    <GradeLivros livros={livrosVisiveis} />
                                ) : (
                                    <div className='estadoBiblioteca'>
                                        Nenhum livro encontrado com esses filtros.
                                    </div>
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
