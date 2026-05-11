import { Award, Lightbulb, Library, ChevronRight } from 'lucide-react';
import './AtalhosRapidos.css';

const atalhos = [
  {
    icone: Award,
    tag: 'Quiz',
    titulo: 'Quiz diário',
    descricao: 'Teste seus conhecimentos e receba um brinde.',
  },
  {
    icone: Lightbulb,
    tag: 'Últimas dicas',
    titulo: 'Últimas dicas',
    descricao: 'Fique por dentro de tudo que há de importante.',
  },
  {
    icone: Library,
    tag: 'Biblioteca',
    titulo: 'Biblioteca',
    descricao: 'Acesse o que você mais precisa rapidamente.',
  },
];

function CartaoAtalho({ icone, tag, titulo, descricao }) {
  const Icone = icone;

  return (
    <article className="cartaoAtalho">
      <div className="infoAtalho">
        <div className="linhaAtalho">
          <Icone size={16} className="iconeAtalho" />
          <span>{tag}</span>
        </div>
        <h3>{titulo}</h3>
        <p>{descricao}</p>
      </div>

      <button className="botaoAtalho" type="button">
        Ir
        <ChevronRight size={14} />
      </button>
    </article>
  );
}

export default function AtalhosRapidos() {
  return (
    <section className="atalhosSecao">
      <div className="tituloAtalhos">
        <span>Passo a passo</span>
        <h2>Seus atalhos principais</h2>
        <p>Tudo o que você precisa a um clique de distância</p>
      </div>

      <div className="gradeAtalhos">
        {atalhos.map((atalho) => (
          <CartaoAtalho
            key={atalho.titulo}
            icone={atalho.icone}
            tag={atalho.tag}
            titulo={atalho.titulo}
            descricao={atalho.descricao}
          />
        ))}
      </div>
    </section>
  );
}