import { useEffect, useMemo, useState } from 'react';
import AulaDestaque from '../../components/VideoAulas/AulaDestaque.jsx';
import GradeVideoAulas from '../../components/VideoAulas/GradeVideoAulas.jsx';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import { buscarConteudos } from '../../services/conteudoService.js';
import './VideoAulas.css';

const textos = {
    pt: {
        titulo: 'Videoaulas',
        subtitulo: 'Videos e materiais de apoio cadastrados para o livro.',
        secao: 'Material de apoio',
        carregando: 'Carregando conteudos...',
        vazio: 'Nenhum conteudo encontrado.',
        erro: 'Nao foi possivel carregar os conteudos.',
    },
    en: {
        titulo: 'Video Lessons',
        subtitulo: 'Videos and support materials registered for the book.',
        secao: 'Support Material',
        carregando: 'Loading content...',
        vazio: 'No content found.',
        erro: 'Could not load content.',
    },
};

export default function VideoAulas({ usuario, aoSair }) {
    const { idioma } = useIdioma();
    const t = textos[idioma] ?? textos.pt;
    const [conteudos, setConteudos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        let ativo = true;

        async function carregarConteudos() {
            try {
                setCarregando(true);
                setErro('');
                const dados = await buscarConteudos();
                if (ativo) setConteudos(dados);
            } catch (error) {
                if (ativo) setErro(error.message || t.erro);
            } finally {
                if (ativo) setCarregando(false);
            }
        }

        carregarConteudos();

        return () => {
            ativo = false;
        };
    }, [t.erro]);

    const conteudosTratados = useMemo(() => {
        return conteudos.map((conteudo) => ({
            ...conteudo,
            titulo: idioma === 'en' ? conteudo.tituloEn : conteudo.titulo,
            descricao: idioma === 'en' ? conteudo.descricaoEn : conteudo.descricao,
            tipo: idioma === 'en' ? conteudo.tipoEn : conteudo.tipo,
        }));
    }, [conteudos, idioma]);

    const aulaDestaque = conteudosTratados.find((conteudo) => conteudo.tipoMaterial === 'video');
    const materiais = conteudosTratados.filter((conteudo) => conteudo.id !== aulaDestaque?.id);

    return (
        <div className="paginaVideoAulas">
            <MenuLateral itemAtivo="Videoaulas" aoSair={aoSair} />

            <div className="conteudoVideoAulas">
                <Cabecalho usuario={usuario} aoSair={aoSair} />

                <main className="areaVideoAulas">
                    <div className="interiorVideoAulas">
                        <div className="topoVideoAulas">
                            <h1>{t.titulo}</h1>
                            <p>{t.subtitulo}</p>
                        </div>

                        {carregando ? (
                            <div className="estadoVideoAulas">{t.carregando}</div>
                        ) : erro ? (
                            <div className="estadoVideoAulas">{erro}</div>
                        ) : aulaDestaque ? (
                            <AulaDestaque aula={aulaDestaque} />
                        ) : (
                            <div className="estadoVideoAulas">{t.vazio}</div>
                        )}

                        {!carregando && !erro ? (
                            <section className="secaoMaisAulas">
                                <div className="topoMaisAulas">
                                    <div className="tituloMaisAulas">
                                        <span className="linhaTituloVideo" />
                                        <h2>{t.secao}</h2>
                                    </div>
                                </div>

                                {materiais.length > 0 ? (
                                    <GradeVideoAulas aulas={materiais} />
                                ) : (
                                    <div className="estadoVideoAulas">{t.vazio}</div>
                                )}
                            </section>
                        ) : null}
                    </div>
                </main>

                <Rodape />
            </div>
        </div>
    );
}
