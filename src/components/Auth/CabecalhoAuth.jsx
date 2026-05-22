import { Globe } from 'lucide-react';
import './CabecalhoAuth.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

export default function CabecalhoAuth({ modo, aoAlternarModo }) {
  const { idioma, alternarIdioma } = useIdioma();

  const ativo = idioma === 'pt' ? 'PT' : 'EN';
  const inativo = idioma === 'pt' ? 'EN' : 'PT';

  return (
    <header className="cabecalhoAuth">
      <div className="marcaAuth">
        <div className="logoAuth">D</div>
        <span className="nomeAuth">
          Dev<span>Stone</span>
        </span>
      </div>

      <div className="acoesAuth">
        <button
          className="botaoIdiomaAuth"
          type="button"
          aria-label="Selecionar idioma"
          onClick={alternarIdioma}
        >
          <Globe size={15} />
          <span>{ativo}</span>
          <span className="divisorIdiomaAuth" aria-hidden="true" />
          <span className="idiomaSecundarioAuth">{inativo}</span>
        </button>

        <button className="botaoTrocaAuth" type="button" onClick={aoAlternarModo}>
          {modo === 'entrar'
            ? (idioma === 'pt' ? 'Ainda não possui conta? Criar' : "Don't have an account? Sign up")
            : (idioma === 'pt' ? 'Já possui conta? Entrar' : 'Already have an account? Sign in')}
        </button>
      </div>
    </header>
  );
}
