import { Eye, EyeOff } from 'lucide-react';
import './FormularioAuth.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const textos = {
  pt: {
    entrar: 'Entrar',
    criar: 'Criar Conta',
    tituloEntrar: 'Entre na sua conta',
    tituloCriar: 'Crie sua conta',
    subtituloEntrar: 'Use seu e-mail ou usuário para acessar.',
    subtituloCriar: 'Preencha os dados básicos para começar.',
    nome: 'Nome',
    nomePlaceholder: 'Nome completo',
    usuario: 'Usuário',
    usuarioPlaceholder: 'Escolha um usuário',
    idade: 'Idade',
    emailOuUsuario: 'Email ou usuário',
    email: 'Email',
    emailPlaceholder: 'voce@devstone.com ou seu.usuario',
    emailPlaceholderCriar: 'voce@devstone.com',
    senha: 'Senha',
    senhaPlaceholder: 'Digite a senha',
    confirmarSenha: 'Confirmar senha',
    confirmarSenhaPlaceholder: 'Repita a senha',
    aguarde: 'Aguarde...',
    acessar: 'Acessar Plataforma',
    finalizar: 'Finalizar Registro',
  },
  en: {
    entrar: 'Sign In',
    criar: 'Create Account',
    tituloEntrar: 'Sign in to your account',
    tituloCriar: 'Create your account',
    subtituloEntrar: 'Use your email or username to access.',
    subtituloCriar: 'Fill in the basic info to get started.',
    nome: 'Name',
    nomePlaceholder: 'Full name',
    usuario: 'Username',
    usuarioPlaceholder: 'Choose a username',
    idade: 'Age',
    emailOuUsuario: 'Email or username',
    email: 'Email',
    emailPlaceholder: 'you@devstone.com or your.username',
    emailPlaceholderCriar: 'you@devstone.com',
    senha: 'Password',
    senhaPlaceholder: 'Enter password',
    confirmarSenha: 'Confirm password',
    confirmarSenhaPlaceholder: 'Repeat password',
    aguarde: 'Please wait...',
    acessar: 'Access Platform',
    finalizar: 'Complete Registration',
  },
};

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
  const { idioma } = useIdioma();
  const t = textos[idioma] ?? textos.pt;

  return (
    <section className="formularioAuth">
      <div className="abasAuth">
        <button
          type="button"
          className={modo === 'entrar' ? 'abaAtiva' : ''}
          onClick={() => aoMudarModo('entrar')}
        >
          {t.entrar}
        </button>
        <button
          type="button"
          className={modo === 'criar' ? 'abaAtiva' : ''}
          onClick={() => aoMudarModo('criar')}
        >
          {t.criar}
        </button>
      </div>

      <div className="cabecalhoFormularioAuth">
        <h2>{modo === 'entrar' ? t.tituloEntrar : t.tituloCriar}</h2>
        <p>{modo === 'entrar' ? t.subtituloEntrar : t.subtituloCriar}</p>
      </div>

      <form className="camposAuth" onSubmit={aoSubmit}>
        {modo === 'criar' && (
          <>
            <label>
              <span>{t.nome}</span>
              <input
                name="nome"
                type="text"
                value={dadosCadastro.nome}
                onChange={aoMudarCadastro}
                placeholder={t.nomePlaceholder}
                required
              />
            </label>

            <div className="duasColunasAuth">
              <label>
                <span>{t.usuario}</span>
                <input
                  name="username"
                  type="text"
                  value={dadosCadastro.username}
                  onChange={aoMudarCadastro}
                  placeholder={t.usuarioPlaceholder}
                />
              </label>

              <label>
                <span>{t.idade}</span>
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
          <span>{modo === 'entrar' ? t.emailOuUsuario : t.email}</span>
          <input
            name={modo === 'entrar' ? 'identificador' : 'email'}
            type={modo === 'entrar' ? 'text' : 'email'}
            value={modo === 'entrar' ? dadosLogin.identificador : dadosCadastro.email}
            onChange={modo === 'entrar' ? aoMudarLogin : aoMudarCadastro}
            placeholder={modo === 'entrar' ? t.emailPlaceholder : t.emailPlaceholderCriar}
            required
          />
        </label>

        <div className="duasColunasAuth">
          <label>
            <span>{t.senha}</span>
            <div className="campoSenhaAuth">
              <input
                name="senha"
                type={mostrarSenha ? 'text' : 'password'}
                value={modo === 'entrar' ? dadosLogin.senha : dadosCadastro.senha}
                onChange={modo === 'entrar' ? aoMudarLogin : aoMudarCadastro}
                placeholder={t.senhaPlaceholder}
                required
              />
              <button type="button" onClick={aoAlternarSenha} aria-label="Mostrar senha">
                {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {modo === 'criar' && (
            <label>
              <span>{t.confirmarSenha}</span>
              <input
                name="confirmarSenha"
                type={mostrarSenha ? 'text' : 'password'}
                value={dadosCadastro.confirmarSenha}
                onChange={aoMudarCadastro}
                placeholder={t.confirmarSenhaPlaceholder}
                required
              />
            </label>
          )}
        </div>

        {erro && <div className="mensagemAuth mensagemErroAuth">{erro}</div>}
        {mensagem && <div className="mensagemAuth mensagemSucessoAuth">{mensagem}</div>}

        <button className="botaoPrincipalAuth" type="submit" disabled={carregando}>
          {carregando ? t.aguarde : modo === 'entrar' ? t.acessar : t.finalizar}
        </button>
      </form>
    </section>
  );
}