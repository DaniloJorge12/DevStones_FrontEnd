import { ArrowRight } from 'lucide-react';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import './CartaoLivro.css';

export default function CartaoLivro({ livro }) {
  const { idioma } = useIdioma();
  const textos = {
      pt: {
          capa: 'Capa do livro',
          acessar: 'Acessar conteúdo'
      },
      en: {
          capa: 'Cover of the book',
          acessar: 'Access content'
      }
  };
  const t = textos[idioma] || textos.pt;

  return (
    <article className="cartaoLivro">
      <div className="capaLivro">
        <img src={livro.imagem} alt={`${t.capa} ${livro.titulo}`} />
        <span className="tagLivro">{idioma === 'en' ? livro.destaqueEn : livro.destaque}</span>
      </div>

      <div className="conteudoLivro">
        <div className="cabecalhoLivro">
          <span className="categoriaLivro">{idioma === 'en' ? livro.categoriaEn : livro.categoria}</span>
          <h3>{livro.titulo}</h3>
          <p className="autorLivro">{livro.autor}</p>
        </div>

        <p className="resumoLivro">{idioma === 'en' ? livro.resumoEn : livro.resumo}</p>

        <button className="botaoLivro" type="button">
          {t.acessar}
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}