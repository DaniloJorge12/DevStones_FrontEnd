import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import './CartaoLivro.css';

export default function CartaoLivro({ livro }) {
  const { idioma } = useIdioma();
  const [modalAberto, setModalAberto] = useState(false);

  const textos = {
      pt: {
          capa: 'Capa do livro',
          acessar: 'Ver mais',
          fechar: 'Fechar',
          autor: 'Autor',
          categoria: 'Categoria',
          fonte: 'Origem da API',
          ano: 'Ano de publicação',
          detalhes: 'Detalhes da Obra'
      },
      en: {
          capa: 'Cover of the book',
          acessar: 'See more',
          fechar: 'Close',
          autor: 'Author',
          categoria: 'Category',
          fonte: 'API Source',
          ano: 'Publication year',
          detalhes: 'Book Details'
      }
  };
  const t = textos[idioma] || textos.pt;

  return (
    <>
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

          <button className="botaoLivro" type="button" onClick={() => setModalAberto(true)}>
            {t.acessar}
            <ArrowRight size={16} />
          </button>
        </div>
      </article>

      {modalAberto && (
        <div className="overlayDetalhesLivro" onClick={() => setModalAberto(false)}>
          <div className="modalDetalhesLivro" onClick={(e) => e.stopPropagation()}>
            <button className="botaoFecharModal" onClick={() => setModalAberto(false)} aria-label={t.fechar}>
              <X size={20} />
            </button>
            
            <div className="conteudoModalLivro">
              <div className="imagemModalLivro">
                <img src={livro.imagem} alt={livro.titulo} />
              </div>
              
              <div className="dadosModalLivro">
                <span className="tagFonteModal">{t.fonte}: {livro.fonte}</span>
                <h2>{livro.titulo}</h2>
                <p className="autorModalLivro"><strong>{t.autor}:</strong> {livro.autor}</p>
                
                <div className="infoRapidasModal">
                  <span><strong>{t.categoria}:</strong> {idioma === 'en' ? livro.categoriaEn : livro.categoria}</span>
                  {livro.anoPublicacao && (
                    <span><strong>{t.ano}:</strong> {livro.anoPublicacao}</span>
                  )}
                </div>
                
                <div className="resumoModalLivro">
                  <h3>{t.detalhes}</h3>
                  <p>{idioma === 'en' ? livro.resumoEn : livro.resumo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}