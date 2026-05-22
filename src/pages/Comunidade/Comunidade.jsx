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
    const [publicacoes, setPublicacoes] = useState([]);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [editando, setEditando] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        let ativo = true;

        buscarPublicacoesComunidade()
            .then((dados) => {
                if (ativo) setPublicacoes(dados);
            })
            .catch((error) => {
                if (ativo) setErro(error.message || 'Nao foi possivel carregar a comunidade.');
            })
            .finally(() => {
                if (ativo) setCarregando(false);
            });

        return () => {
            ativo = false;
        };
    }, []);

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
            idUsuario: usuario?.id,
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
            setErro(error.message || 'Nao foi possivel salvar a publicacao.');
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
        const confirmou = window.confirm(`Excluir a publicacao "${publicacao.titulo}"?`);
        if (!confirmou) return;

        try {
            setErro('');
            await deletarPublicacaoComunidade(publicacao.id);
            setPublicacoes((atuais) => atuais.filter((item) => item.id !== publicacao.id));
            if (editando?.id === publicacao.id) limparFormulario();
        } catch (error) {
            setErro(error.message || 'Nao foi possivel excluir a publicacao.');
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
            setErro(error.message || 'Nao foi possivel curtir a publicacao.');
        }
    }

    return (
        <div className="paginaComunidade">
            <MenuLateral itemAtivo="Comunidade & Dicas" aoSair={aoSair} />

            <div className="conteudoComunidade">
                <Cabecalho usuario={usuario} aoSair={aoSair} />

                <main className="areaComunidade">
                    <div className="interiorComunidade">
                        <div className="topoComunidade">
                            <span>Forum interativo</span>
                            <h1>Dicas de Vestibular</h1>
                            <p>Compartilhe suas estrategias, analises e debata com a equipe.</p>
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
                            <div className="estadoComunidade">Carregando publicacoes...</div>
                        ) : publicacoes.length > 0 ? (
                            <ListaPublicacoes
                                publicacoes={publicacoes}
                                aoEditar={editarPublicacao}
                                aoExcluir={excluirPublicacao}
                                aoCurtir={curtirPublicacao}
                            />
                        ) : (
                            <div className="estadoComunidade">Nenhuma publicacao encontrada.</div>
                        )}
                    </div>
                </main>

                <Rodape />
            </div>
        </div>
    );
}
