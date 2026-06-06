import { Heart, Pencil, Trash2 } from 'lucide-react';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import './ListaPublicacoes.css';

function obterIniciais(nome = 'U') {
    return nome
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase();
}

function formatarData(data, idioma) {
    if (!data) return '';
    const loc = idioma === 'en' ? 'en-US' : 'pt-BR';
    return new Intl.DateTimeFormat(loc, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(data));
}

export default function ListaPublicacoes({ publicacoes, aoEditar, aoExcluir, aoCurtir, usuario }) {
    const { idioma } = useIdioma();
    
    const textos = {
        pt: {
            agora: 'Agora',
            editar: 'Editar',
            excluir: 'Excluir',
            curtidas: 'curtidas'
        },
        en: {
            agora: 'Now',
            editar: 'Edit',
            excluir: 'Delete',
            curtidas: 'likes'
        }
    };
    
    const t = textos[idioma] || textos.pt;

    return (
        <section className="listaPublicacoes">
            {publicacoes.map((publicacao) => (
                <article className="cartaoPublicacao" key={publicacao.id}>
                    <div className="topoPublicacao">
                        <div className="autorPublicacao">
                            <div className="avatarPublicacao">{obterIniciais(publicacao.autor)}</div>
                            <div>
                                <strong>{publicacao.autor}</strong>
                                <span>{formatarData(publicacao.criadoEm, idioma) || t.agora}</span>
                            </div>
                        </div>

                        {(usuario && (publicacao.idUsuario == usuario.id || (!publicacao.idUsuario && publicacao.autor === (usuario.nome || usuario.username || 'Usuario')))) && (
                            <div className="acoesPublicacao">
                                <button
                                    type="button"
                                    onClick={() => aoEditar(publicacao)}
                                    aria-label={t.editar}
                                    title={t.editar}
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => aoExcluir(publicacao)}
                                    aria-label={t.excluir}
                                    title={t.excluir}
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="conteudoPublicacao">
                        <div className="linhaTituloPublicacao">
                            <h2>{publicacao.titulo}</h2>
                        </div>
                        <p>{publicacao.conteudo}</p>
                    </div>

                    <div className="rodapePublicacao">
                        <button type="button" onClick={() => aoCurtir(publicacao)}>
                            <Heart size={14} />
                            {publicacao.curtidas || 0} {t.curtidas}
                        </button>
                    </div>
                </article>
            ))}
        </section>
    );
}
