import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import './CartaoIntegrante.css';

export default function CartaoIntegrante({
    integrante,
}) {
    const { idioma } = useIdioma();

    const nomeLimpo = integrante.nome ? encodeURIComponent(integrante.nome) : 'Dev';
    const imagemPadrao = `https://ui-avatars.com/api/?name=${nomeLimpo}&background=random&color=fff&size=150`;


    const imagemValida =
        !integrante.foto || integrante.foto?.includes('exemplo.com')
            ? imagemPadrao
            : integrante.foto;

    return (
        <article className="cartaoIntegrante">
            <div className="capaIntegrante">
                <img
                    src={imagemValida}
                    alt={integrante.nome}
                    onError={(e) => {
                        e.target.src = imagemPadrao;
                    }}
                />
            </div>

            <div className="conteudoIntegrante">
                <div className="cabecalhoIntegrante">
                    <span className="categoriaIntegrante">
                        {integrante.funcao}
                    </span>

                    <h3>{integrante.nome}</h3>

                    <p className="autorIntegrante">
                        {idioma === 'en' ? (integrante.curso_en || integrante.curso) : integrante.curso}
                    </p>
                </div>
            </div>
        </article>
    );
}
