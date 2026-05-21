import { Code2, BookOpen, Languages } from 'lucide-react';
import './TopoSobre.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const textos = {
  pt: {
    selo: 'SOBRE O PROJETO',
    titulo: 'Conectando tecnologia e literatura',
    descricao:
      'Uma colaboração única entre as disciplinas de Desenvolvimento de Sistemas (SENAI) e Língua Portuguesa/Inglês (SESI) para criar a melhor ferramenta de preparação para vestibulares.',
    cards: [
      {
        titulo: 'Backend & API',
        descricao:
          'Infraestrutura robusta desenvolvida em Node.js e PostgreSQL pelos alunos do SENAI. Nossa API REST fornece dados em tempo real para toda a plataforma.',
      },
      {
        titulo: 'Conteúdo Literário',
        descricao:
          'Resumos, análises e simulados desenvolvidos pelos alunos do SESI, focando em preparação para vestibulares.',
      },
      {
        titulo: 'Imersão Bilíngue',
        descricao:
          'Plataforma 100% adaptada para Inglês com foco em acessibilidade e interpretação do conteúdo.',
      },
    ],
  },
  en: {
    selo: 'ABOUT THE PROJECT',
    titulo: 'Connecting technology and literature',
    descricao:
      'A unique collaboration between the Systems Development (SENAI) and Portuguese/English Language (SESI) disciplines to create the best college entrance exam preparation tool.',
    cards: [
      {
        titulo: 'Backend & API',
        descricao:
          'Robust infrastructure built with Node.js and PostgreSQL by SENAI students. Our REST API delivers real-time data to the entire platform.',
      },
      {
        titulo: 'Literary Content',
        descricao:
          'Summaries, analyses, and practice tests developed by SESI students, focused on college entrance exam preparation.',
      },
      {
        titulo: 'Bilingual Immersion',
        descricao:
          'Platform fully adapted for English, with a focus on accessibility and content comprehension.',
      },
    ],
  },
};

const icones = [Code2, BookOpen, Languages];
const cores  = ['vermelho', 'azul', 'verde'];

export default function TopoSobre() {
  const { idioma } = useIdioma();
  const t = textos[idioma];

  return (
    <section className="topoSobre">
      <div className="textoTopoSobre">
        <span className="seloTopoSobre">{t.selo}</span>
        <h1>{t.titulo}</h1>
        <p>{t.descricao}</p>
      </div>

      <div className="cardsProjeto">
        {t.cards.map((card, i) => {
          const Icone = icones[i];
          return (
            <article className="cardProjeto" key={card.titulo}>
              <div className={`iconeProjeto ${cores[i]}`}>
                <Icone size={22} />
              </div>
              <h3>{card.titulo}</h3>
              <p>{card.descricao}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}