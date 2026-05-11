import { ChevronRight } from 'lucide-react';
import './LivroDestaque.css';

export default function LivroDestaque() {
  return (
    <section className="livroDestaque">
      <div className="capaLivro">
        <img
          src="/src/assets/img/book.png"
          alt="Capa do livro Caminho das Pedras"
        />
      </div>

      <div className="textoLivro">
        <div className="seloLivro">
          <span className="pontoLivro" aria-hidden="true" />
          Análise em foco
        </div>

        <h2>Caminho das Pedras</h2>
        <p>
          Descubra os segredos, as personagens marcantes e o contexto histórico deste livro
          fundamental. Preparamos uma análise completa para você gabaritar as questões de
          literatura nas principais provas do país.
        </p>

        <button className="botaoLivro" type="button">
          Explorar livro
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}