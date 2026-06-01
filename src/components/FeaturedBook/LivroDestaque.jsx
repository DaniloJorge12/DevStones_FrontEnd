import { ChevronRight } from 'lucide-react';
import './LivroDestaque.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const textos = {
    pt: {
        selo: 'Análise em foco',
        titulo: 'Caminho das Pedras',
        descricao:
            'Descubra os segredos, as personagens marcantes e o contexto histórico deste livro fundamental. Preparamos uma análise completa para você gabaritar as questões de literatura nas principais provas do país.',
        botao: 'Explorar livro',
    },

    en: {
        selo: 'Analysis in focus',
        titulo: 'Caminho das Pedras',
        descricao:
            'Discover the secrets, the memorable characters, and the historical context of this essential book. We prepared a complete analysis to help you ace the literature questions in the most important national exams.',
        botao: 'Explore book',
    },
};

export default function LivroDestaque() {
    const { idioma } = useIdioma();
    const t = textos[idioma];

    function abrirLivro() {
        window.location.href = '/livro';
    }

    return (
        <section className="livroDestaque">
            <div className="capaLivro">
                <img
                    src="https://ejriuxfncwbsvebswmtg.supabase.co/storage/v1/object/public/arquivos/book.png"
                    alt="Capa do livro Caminho das Pedras"
                />
            </div>

            <div className="textoLivro">
                <div className="seloLivro">
                    <span className="pontoLivro" aria-hidden="true" />
                    {t.selo}
                </div>

                <h2>{t.titulo}</h2>
                <p>{t.descricao}</p>

                <button className="botaoLivro" type="button" onClick={abrirLivro}>
                    {t.botao}
                    <ChevronRight size={18} />
                </button>
            </div>
        </section>
    );
}
