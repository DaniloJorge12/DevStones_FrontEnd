import { ArrowRight } from 'lucide-react';
import './CartaoLivro.css';

export default function CartaoLivro({ livro }) {
  return (
    <article className="cartaoLivro">
      <div className="capaLivro">
        <img src={livro.imagem} alt={`Capa do livro ${livro.titulo}`} />
        <span className="tagLivro">{livro.destaque}</span>
      </div>

      <div className="conteudoLivro">
        <div className="cabecalhoLivro">
          <span className="categoriaLivro">{livro.categoria}</span>
          <h3>{livro.titulo}</h3>
          <p className="autorLivro">{livro.autor}</p>
        </div>

        <p className="resumoLivro">{livro.resumo}</p>

        <button className="botaoLivro" type="button">
          Acessar conteúdo
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}