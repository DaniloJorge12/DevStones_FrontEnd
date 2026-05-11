import './CabecalhoAuth.css';

export default function CabecalhoAuth({ modo, aoAlternarModo }) {
  return (
    <header className="cabecalhoAuth">
      <div className="marcaAuth">
        <div className="logoAuth">D</div>
        <span className="nomeAuth">
          Dev<span>Stone</span>
        </span>
      </div>

      <div className="acoesAuth">
        <button className="botaoTrocaAuth" type="button" onClick={aoAlternarModo}>
          {modo === 'entrar' ? 'Ainda não possui conta? Criar' : 'Já possui conta? Entrar'}
        </button>
      </div>
    </header>
  );
}