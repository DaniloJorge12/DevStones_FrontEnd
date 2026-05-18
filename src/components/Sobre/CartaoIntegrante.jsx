import './CartaoIntegrante.css';

export default function CartaoIntegrante({
    integrante,
}) {
    const imagemPadrao =
        'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    const imagemValida =
        integrante.foto?.includes(
            'exemplo.com',
        )
            ? imagemPadrao
            : integrante.foto;

    return (
        <article className="cartaoIntegrante">
            <div className="capaIntegrante">
                <img
                    src={
                        imagemValida ||
                        imagemPadrao
                    }
                    alt={integrante.nome}
                    onError={(e) => {
                        e.target.src =
                            imagemPadrao;
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
                        {integrante.curso}
                    </p>
                </div>
            </div>
        </article>
    );
}
