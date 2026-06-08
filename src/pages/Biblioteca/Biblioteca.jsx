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
    {
        nome: 'Quarto de Despejo',
        url: 'https://backend-projeto-integrador-rana.onrender.com/api/livro',
        apiKey: 'amods',
    },
    {
        nome: 'Vidas Secas (Alves)',
        url: 'https://bookverse-back-pob5.onrender.com/livros',
        apiKey: 'amods',
    },
    {
        nome: 'Bertunho',
        url: 'https://readflow-m8o6.onrender.com/api/livros',
        apiKey: 'projetoamods',
    },
    {
        nome: "Olhos d'Água",
        url: 'https://olhosdagua.onrender.com/api/livro',
        apiKey: '6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd',
    },
];

function extrairListaLivros(dados) {
    if (Array.isArray(dados)) {
        return dados;
    }

    return dados?.data || dados?.livros || dados?.results || dados?.books || [];
}

function normalizarLivro(livro, fonteNome, idioma) {
    const en = idioma === 'en';
    const id =
        livro.id ||
        livro._id ||
        livro.idLivro ||
        livro.bookId ||
        `${fonteNome}-${livro.titulo || livro.autor || livro.categoria || Math.random().toString(36).slice(2)}`;

    let imagem = livro.capa || livro.imagem || livro.capaUrl || livro.capaURl || livro.capa_url || '/src/assets/img/book.png';

    let titulo = livro.titulo || livro.nome || livro.nomeLivro || 'Livro sem título';
    let tituloEn = livro.tituloEn || livro.titulo_en || livro.tituloEN || titulo;
    if (fonteNome === 'Quarto de Despejo') {
        titulo = livro.tituloPT || titulo;
        tituloEn = livro.tituloEN || livro.tituloPT || titulo;
    }
    let tituloAtivo = en ? tituloEn : titulo;

    let resumo = livro.resumo || livro.descricao || livro.sinopse || '';
    let resumoEn = livro.resumoEn || livro.resumo_en || livro.descricaoEn || livro.descricao_en || resumo;
    if (fonteNome === 'Quarto de Despejo') {
        resumo = livro.descricaoPT || resumo;
        resumoEn = livro.descricaoEN || livro.descricaoPT || resumo;
    } else if (fonteNome === 'Vidas Secas (Alves)') {
        resumo = livro.movimento_pt || resumo;
        resumoEn = livro.movimento_en || livro.movimento_pt || resumo;
    }

    let categoria = livro.genero || livro.categoria || livro.tipo || 'Literatura';
    let categoriaEn = livro.genero_en || livro.categoria_en || livro.genero || livro.categoria || livro.tipo || 'Literature';

    let destaque = livro.anoPublicacao
        ? String(livro.anoPublicacao)
        : categoria;
    let destaqueEn = livro.anoPublicacao
        ? String(livro.anoPublicacao)
        : categoriaEn;

    return {
        id,
        titulo: tituloAtivo,
        autor: livro.autor || livro.autorNome || 'Autor desconhecido',
        categoria,
        categoriaEn,
        destaque,
        destaqueEn,
        imagem,
        resumo,
        resumoEn,
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
            return lista.map((livro) => normalizarLivro(livro, fonte.nome, idioma));
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
