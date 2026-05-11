import { BookOpen, MessageSquare, ShieldCheck } from 'lucide-react';
import './PainelAuth.css';

const vantagens = [
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
];

export default function PainelAuth() {
  return (
    <aside className="painelAuth">
      <div className="conteudoPainelAuth">
        <div className="iconePainelAuth">D</div>
        <h1>Acesso à biblioteca e aos estudos.</h1>
        <p>
          Entre para continuar de onde parou ou crie sua conta para começar a usar a plataforma.
        </p>

        <ul className="listaVantagensAuth">
          {vantagens.map((vantagem) => {
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