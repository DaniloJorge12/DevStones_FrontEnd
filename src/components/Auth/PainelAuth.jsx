import { BookOpen, MessageSquare, ShieldCheck } from 'lucide-react';
import './PainelAuth.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const conteudo = {
  pt: {
    titulo: 'Acesso à biblioteca e aos estudos.',
    subtitulo: 'Entre para continuar de onde parou ou crie sua conta para começar a usar a plataforma.',
    vantagens: [
      {
        icone: BookOpen,
        titulo: 'Leitura centralizada',
        descricao: 'Obras, resumos e livros ficam organizados no mesmo lugar.',
      },
      {
        icone: MessageSquare,
        titulo: 'Dúvidas e revisão',
        descricao: 'Material pronto para revisar antes das provas.',
      },
      {
        icone: ShieldCheck,
        titulo: 'Conta vinculada',
        descricao: 'Seu acesso conversa com o backend quando a API estiver pronta.',
      },
    ],
  },
  en: {
    titulo: 'Access to the library and your studies.',
    subtitulo: 'Sign in to pick up where you left off, or create an account to start using the platform.',
    vantagens: [
      {
        icone: BookOpen,
        titulo: 'Centralized reading',
        descricao: 'Works, summaries and books all organized in one place.',
      },
      {
        icone: MessageSquare,
        titulo: 'Review and questions',
        descricao: 'Ready-made material to review before exams.',
      },
      {
        icone: ShieldCheck,
        titulo: 'Linked account',
        descricao: 'Your access talks to the backend once the API is ready.',
      },
    ],
  },
};

export default function PainelAuth() {
  const { idioma } = useIdioma();
  const c = conteudo[idioma] ?? conteudo.pt;

  return (
    <aside className="painelAuth">
      <div className="conteudoPainelAuth">
        <div className="iconePainelAuth">D</div>
        <h1>{c.titulo}</h1>
        <p>{c.subtitulo}</p>

        <ul className="listaVantagensAuth">
          {c.vantagens.map((vantagem) => {
            const Icone = vantagem.icone;
            return (
              <li key={vantagem.titulo}>
                <span className="marcaVantagemAuth">
                  <Icone size={15} />
                </span>
                <div>
                  <strong>{vantagem.titulo}</strong>
                  <span>{vantagem.descricao}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}