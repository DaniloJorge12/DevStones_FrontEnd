import { ArrowRight } from 'lucide-react';
import './CartaoIntegrante.css';

export default function CartaoIntegrante({ integrante }) {
  return (
      <article className="cartaoIntegrante">
          <div className="capaIntegrante">
              <img src={integrante.imagem} alt={`Capa do Integrante ${integrante.titulo}`} />
              <span className="tagIntegrante">{integrante.destaque}</span>
          </div>

          <div className="conteudoIntegrante">
              <div className="cabecalhoIntegrante">
                  <span className="categoriaIntegrante">{integrante.categoria}</span>
                  <h3>{integrante.titulo}</h3>
                  <p className="autorIntegrante">{integrante.autor}</p>
              </div>
          </div>
      </article>
  );
}
