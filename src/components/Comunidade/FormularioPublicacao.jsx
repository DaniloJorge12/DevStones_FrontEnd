import { Image, Send, X } from 'lucide-react';
import './FormularioPublicacao.css';

function obterIniciais(nome = 'U') {
    return nome
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase();
}

export default function FormularioPublicacao({
    usuario,
    valores,
    editando,
    carregando,
    aoMudar,
    aoEnviar,
    aoCancelar,
}) {
    const nomeUsuario = usuario?.nome || usuario?.username || 'Usuario';
    const fotoUsuario = usuario?.foto;

    return (
        <form className="formularioPublicacao" onSubmit={aoEnviar}>
            <div className="corpoFormularioPublicacao">
                <div className="avatarFormularioPublicacao">
                    {fotoUsuario ? <img src={fotoUsuario} alt={nomeUsuario} /> : obterIniciais(nomeUsuario)}
                </div>

                <textarea
                    name="conteudo"
                    value={valores.conteudo}
                    onChange={aoMudar}
                    placeholder="Qual a sua dica de ouro de hoje sobre a obra?"
                    rows={4}
                    required
                />
            </div>

            <div className="rodapeFormularioPublicacao">
                <div className="ferramentasFormularioPublicacao">
                    <button type="button" aria-label="Adicionar imagem" title="Adicionar imagem">
                        <Image size={14} />
                    </button>
                </div>

                <div className="acoesFormularioPublicacao">
                    {editando ? (
                        <button className="botaoCancelarPublicacao" type="button" onClick={aoCancelar}>
                            <X size={15} />
                            Cancelar
                        </button>
                    ) : null}

                    <button className="botaoEnviarPublicacao" type="submit" disabled={carregando}>
                        <Send size={14} />
                        {editando ? 'Salvar' : 'Postar Dica'}
                    </button>
                </div>
            </div>
        </form>
    );
}
