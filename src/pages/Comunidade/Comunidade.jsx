import { useEffect, useState } from 'react';
import FormularioPublicacao from '../../components/Comunidade/FormularioPublicacao.jsx';
import ListaPublicacoes from '../../components/Comunidade/ListaPublicacoes.jsx';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import {
    atualizarPublicacaoComunidade,
    buscarPublicacoesComunidade,
    criarPublicacaoComunidade,
    deletarPublicacaoComunidade,
} from '../../services/comunidadeService.js';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import './Comunidade.css';

const formularioInicial = {
    titulo: '',
    conteudo: '',
};

function obterAutor(usuario) {
    return usuario?.nome || usuario?.username || 'Usuario';
}

function criarTituloAutomatico(conteudo) {
    const texto = conteudo.trim().replace(/\s+/g, ' ');
    if (texto.length <= 58) return texto;
    return `${texto.slice(0, 58)}...`;
}

export default function Comunidade({ usuario, aoSair }) {
    const { idioma } = useIdioma();
    const [publicacoes, setPublicacoes] = useState([]);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [editando, setEditando] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    const textos = {
        pt: {
            menuItem: 'Comunidade & Dicas',
            forum: 'Fórum interativo',
            titulo: 'Dicas de Vestibular',
            subtitulo: 'Compartilhe suas estratégias, análises e debata com a equipe.',
            erroCarregar: 'Não foi possível carregar a comunidade.',
            erroSalvar: 'Não foi possível salvar a publicação.',
            erroExcluir: 'Não foi possível excluir a publicação.',
            erroCurtir: 'Não foi possível curtir a publicação.',
            confirmarExclusao: 'Excluir a publicação',
            carregando: 'Carregando publicações...',
            vazio: 'Nenhuma publicação encontrada.',
        },
        en: {
            menuItem: 'Community & Tips',
            forum: 'Interactive Forum',
            titulo: 'College Exam Tips',
            subtitulo: 'Share your strategies, analyses and debate with the team.',
            erroCarregar: 'Could not load community.',
            erroSalvar: 'Could not save publication.',
            erroExcluir: 'Could not delete publication.',
            erroCurtir: 'Could not like publication.',
            confirmarExclusao: 'Delete publication',
            carregando: 'Loading publications...',
            vazio: 'No publications found.',
        }
    };
    
    const t = textos[idioma] || textos.pt;

    useEffect(() => {
        let ativo = true;

        buscarPublicacoesComunidade()
            .then((dados) => {
                if (ativo) setPublicacoes(dados);
            })
            .catch((error) => {
                if (ativo) setErro(error.message || t.erroCarregar);
            })
            .finally(() => {
                if (ativo) setCarregando(false);
            });

        return () => {
            ativo = false;
        };
    }, [idioma]);

    function mudarFormulario(evento) {
        const { name, value } = evento.target;
        setFormulario((atual) => ({ ...atual, [name]: value }));
    }

    function limparFormulario() {
        setFormulario(formularioInicial);
        setEditando(null);
    }

    async function enviarPublicacao(evento) {
        evento.preventDefault();

        const dados = {
            titulo: formulario.titulo.trim() || criarTituloAutomatico(formulario.conteudo),
            categoria: 'Dica',
            conteudo: formulario.conteudo.trim(),
            autor: obterAutor(usuario),
            idUsuario: usuario?.id ? Number(usuario.id) : null,
            curtidas: editando?.curtidas || 0,
        };

        if (!dados.titulo || !dados.conteudo) return;

        try {
            setSalvando(true);
            setErro('');

            if (editando) {
                const atualizada = await atualizarPublicacaoComunidade(editando.id, dados);
                setPublicacoes((atuais) =>
                    atuais.map((publicacao) =>
                        publicacao.id === atualizada.id ? atualizada : publicacao
                    )
                );
            } else {
                const criada = await criarPublicacaoComunidade(dados);
                setPublicacoes((atuais) => [criada, ...atuais]);
            }

            limparFormulario();
        } catch (error) {
            setErro(error.message || t.erroSalvar);
        } finally {
            setSalvando(false);
        }
    }

    function editarPublicacao(publicacao) {
        setEditando(publicacao);
        setFormulario({
            titulo: publicacao.titulo || '',
            conteudo: publicacao.conteudo || '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function excluirPublicacao(publicacao) {
        const confirmou = window.confirm(`${t.confirmarExclusao} "${publicacao.titulo}"?`);
        if (!confirmou) return;

        try {
            setErro('');
            await deletarPublicacaoComunidade(publicacao.id);
            setPublicacoes((atuais) => atuais.filter((item) => item.id !== publicacao.id));
            if (editando?.id === publicacao.id) limparFormulario();
        } catch (error) {
            setErro(error.message || t.erroExcluir);
        }
    }

    async function curtirPublicacao(publicacao) {
        const curtidas = (publicacao.curtidas || 0) + 1;

        try {
            const atualizada = await atualizarPublicacaoComunidade(publicacao.id, { curtidas });
            setPublicacoes((atuais) =>
                atuais.map((item) => (item.id === atualizada.id ? atualizada : item))
            );
        } catch (error) {
            setErro(error.message || t.erroCurtir);
        }
    }

    return (
        <div className="paginaComunidade">
            <MenuLateral itemAtivo={t.menuItem} aoSair={aoSair} />

            <div className="conteudoComunidade">
                <Cabecalho usuario={usuario} aoSair={aoSair} />

                <main className="areaComunidade">
                    <div className="interiorComunidade">
                        <div className="topoComunidade">
                            <span>{t.forum}</span>
                            <h1>{t.titulo}</h1>
                            <p>{t.subtitulo}</p>
                        </div>

                        <FormularioPublicacao
                            usuario={usuario}
                            valores={formulario}
                            editando={Boolean(editando)}
                            carregando={salvando}
                            aoMudar={mudarFormulario}
                            aoEnviar={enviarPublicacao}
                            aoCancelar={limparFormulario}
                        />

                        {erro ? <div className="estadoComunidade">{erro}</div> : null}

                        {carregando ? (
                            <div className="estadoComunidade">{t.carregando}</div>
                        ) : publicacoes.length > 0 ? (
                            <ListaPublicacoes
                                publicacoes={publicacoes}
                                aoEditar={editarPublicacao}
                                aoExcluir={excluirPublicacao}
                                aoCurtir={curtirPublicacao}
                                usuario={usuario}
                            />
                        ) : (
                            <div className="estadoComunidade">{t.vazio}</div>
                        )}
                    </div>
                </main>

                <Rodape />
            </div>
        </div>
    );
}
