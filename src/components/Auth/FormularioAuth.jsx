import { Eye, EyeOff } from 'lucide-react';
import './FormularioAuth.css';

export default function FormularioAuth({
  modo,
  dadosLogin,
  dadosCadastro,
  carregando,
  erro,
  mensagem,
  mostrarSenha,
  aoMudarModo,
  aoMudarLogin,
  aoMudarCadastro,
  aoAlternarSenha,
  aoSubmit,
}) {
  return (
    <section className="formularioAuth">
      <div className="abasAuth">
        <button
          type="button"
          className={modo === 'entrar' ? 'abaAtiva' : ''}
          onClick={() => aoMudarModo('entrar')}
        >
          Entrar
        </button>
        <button
          type="button"
          className={modo === 'criar' ? 'abaAtiva' : ''}
          onClick={() => aoMudarModo('criar')}
        >
          Criar Conta
        </button>
      </div>

      <div className="cabecalhoFormularioAuth">
        <h2>{modo === 'entrar' ? 'Entre na sua conta' : 'Crie sua conta'}</h2>
        <p>
          {modo === 'entrar'
            ? 'Use seu e-mail ou usuário para acessar.'
            : 'Preencha os dados básicos para começar.'}
        </p>
      </div>

      <form className="camposAuth" onSubmit={aoSubmit}>
        {modo === 'criar' && (
          <>
            <label>
              <span>Nome</span>
              <input
                name="nome"
                type="text"
                value={dadosCadastro.nome}
                onChange={aoMudarCadastro}
                placeholder="Nome completo"
                required
              />
            </label>

            <div className="duasColunasAuth">
              <label>
                <span>Usuário</span>
                <input
                  name="username"
                  type="text"
                  value={dadosCadastro.username}
                  onChange={aoMudarCadastro}
                  placeholder="Escolha um usuário"
                />
              </label>

              <label>
                <span>Idade</span>
                <input
                  name="idade"
                  type="number"
                  value={dadosCadastro.idade}
                  onChange={aoMudarCadastro}
                  min="1"
                  required
                />
              </label>
            </div>
          </>
        )}

        <label>
          <span>{modo === 'entrar' ? 'Email ou usuário' : 'Email'}</span>
          <input
            name={modo === 'entrar' ? 'identificador' : 'email'}
            type={modo === 'entrar' ? 'text' : 'email'}
            value={modo === 'entrar' ? dadosLogin.identificador : dadosCadastro.email}
            onChange={modo === 'entrar' ? aoMudarLogin : aoMudarCadastro}
            placeholder={modo === 'entrar' ? 'voce@devstone.com ou seu.usuario' : 'voce@devstone.com'}
            required
          />
        </label>

        <div className="duasColunasAuth">
          <label>
            <span>Senha</span>
            <div className="campoSenhaAuth">
              <input
                name="senha"
                type={mostrarSenha ? 'text' : 'password'}
                value={modo === 'entrar' ? dadosLogin.senha : dadosCadastro.senha}
                onChange={modo === 'entrar' ? aoMudarLogin : aoMudarCadastro}
                placeholder="Digite a senha"
                required
              />
              <button type="button" onClick={aoAlternarSenha} aria-label="Mostrar senha">
                {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {modo === 'criar' && (
            <label>
              <span>Confirmar senha</span>
              <input
                name="confirmarSenha"
                type={mostrarSenha ? 'text' : 'password'}
                value={dadosCadastro.confirmarSenha}
                onChange={aoMudarCadastro}
                placeholder="Repita a senha"
                required
              />
            </label>
          )}
        </div>

        {erro && <div className="mensagemAuth mensagemErroAuth">{erro}</div>}
        {mensagem && <div className="mensagemAuth mensagemSucessoAuth">{mensagem}</div>}

        <button className="botaoPrincipalAuth" type="submit" disabled={carregando}>
          {carregando
            ? 'Aguarde...'
            : modo === 'entrar'
              ? 'Acessar Plataforma'
              : 'Finalizar Registro'}
        </button>
      </form>
    </section>
  );
}