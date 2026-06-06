import { Image, Send, X } from 'lucide-react';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
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
    const { idioma } = useIdioma();
    const nomeUsuario = usuario?.nome || usuario?.username || 'Usuario';
    const fotoUsuario = usuario?.foto;

    const textos = {
        pt: {
            placeholder: 'Qual a sua dica de ouro de hoje sobre a obra?',
            cancelar: 'Cancelar',
            salvar: 'Salvar',
            postar: 'Postar Dica',
            addImagem: 'Adicionar imagem'
        },
        en: {
            placeholder: 'What is your golden tip today about the book?',
            cancelar: 'Cancel',
            salvar: 'Save',
            postar: 'Post Tip',
            addImagem: 'Add image'
        }
    };
    
    const t = textos[idioma] || textos.pt;

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
                    placeholder={t.placeholder}
                    rows={4}
                    required
                />
            </div>

            <div className="rodapeFormularioPublicacao">
                <div className="ferramentasFormularioPublicacao">
                    <button type="button" aria-label={t.addImagem} title={t.addImagem}>
                        <Image size={14} />
                    </button>
                </div>

                <div className="acoesFormularioPublicacao">
                    {editando ? (
                        <button className="botaoCancelarPublicacao" type="button" onClick={aoCancelar}>
                            <X size={15} />
                            {t.cancelar}
                        </button>
                    ) : null}

                    <button className="botaoEnviarPublicacao" type="submit" disabled={carregando}>
                        <Send size={14} />
                        {editando ? t.salvar : t.postar}
                    </button>
                </div>
            </div>
        </form>
    );
}
