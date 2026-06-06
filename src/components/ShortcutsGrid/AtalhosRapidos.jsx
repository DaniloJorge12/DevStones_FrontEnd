import { Award, Lightbulb, Library, ChevronRight } from 'lucide-react';
import './AtalhosRapidos.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const atalhos = {
  pt: [
    {
      icone: Award,
      tag: 'Quiz',
      titulo: 'Quiz diário',
      descricao: 'Teste seus conhecimentos e receba um brinde.',
      rota: '/simulados'
    },
    {
      icone: Lightbulb,
      tag: 'Últimas dicas',
      titulo: 'Últimas dicas',
      descricao: 'Fique por dentro de tudo que há de importante.',
      rota: '/comunidade'
    },
    {
      icone: Library,
      tag: 'Biblioteca',
      titulo: 'Biblioteca',
      descricao: 'Acesse o que você mais precisa rapidamente.',
      rota: '/biblioteca'
    },
  ],
  en: [
    {
      icone: Award,
      tag: 'Quiz',
      titulo: 'Daily Quiz',
      descricao: 'Test your knowledge and earn a reward.',
      rota: '/simulados'
    },
    {
      icone: Lightbulb,
      tag: 'Latest Tips',
      titulo: 'Latest Tips',
      descricao: 'Stay up to date with everything that matters.',
      rota: '/comunidade'
    },
    {
      icone: Library,
      tag: 'Library',
      titulo: 'Library',
      descricao: 'Quickly access what you need most.',
      rota: '/biblioteca'
    },
  ],
};

const secao = {
  pt: { label: 'Passo a passo', titulo: 'Seus atalhos principais', desc: 'Tudo o que você precisa a um clique de distância', ir: 'Ir' },
  en: { label: 'Step by step',  titulo: 'Your main shortcuts',     desc: 'Everything you need just one click away',          ir: 'Go' },
};

function CartaoAtalho({ icone, tag, titulo, descricao, labelIr, rota }) {
  const Icone = icone;

  function navegarPara() {
    window.history.pushState({}, '', rota);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

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

      <button className="botaoAtalho" type="button" onClick={navegarPara}>
        {labelIr}
        <ChevronRight size={14} />
      </button>
    </article>
  );
}

export default function AtalhosRapidos() {
  const { idioma } = useIdioma();
  const lista = atalhos[idioma];
  const s = secao[idioma];

  return (
    <section className="atalhosSecao">
      <div className="tituloAtalhos">
        <span>{s.label}</span>
        <h2>{s.titulo}</h2>
        <p>{s.desc}</p>
      </div>

      <div className="gradeAtalhos">
        {lista.map((atalho) => (
          <CartaoAtalho
            key={atalho.titulo}
            icone={atalho.icone}
            tag={atalho.tag}
            titulo={atalho.titulo}
            descricao={atalho.descricao}
            labelIr={s.ir}
            rota={atalho.rota}
          />
        ))}
      </div>
    </section>
  );
}