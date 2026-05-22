import { Heart, Pencil, Trash2 } from 'lucide-react';
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

function formatarData(data) {
    if (!data) return '';

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(data));
}

export default function ListaPublicacoes({ publicacoes, aoEditar, aoExcluir, aoCurtir }) {
    return (
        <section className="listaPublicacoes">
            {publicacoes.map((publicacao) => (
                <article className="cartaoPublicacao" key={publicacao.id}>
                    <div className="topoPublicacao">
                        <div className="autorPublicacao">
                            <div className="avatarPublicacao">{obterIniciais(publicacao.autor)}</div>
                            <div>
                                <strong>{publicacao.autor}</strong>
                                <span>{formatarData(publicacao.criadoEm) || 'Agora'}</span>
                            </div>
                        </div>

                        <div className="acoesPublicacao">
                            <button
                                type="button"
                                onClick={() => aoEditar(publicacao)}
                                aria-label="Editar publicacao"
                                title="Editar"
                            >
                                <Pencil size={15} />
                            </button>
                            <button
                                type="button"
                                onClick={() => aoExcluir(publicacao)}
                                aria-label="Excluir publicacao"
                                title="Excluir"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>
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
                            {publicacao.curtidas || 0} curtidas
                        </button>
                    </div>
                </article>
            ))}
        </section>
    );
}
