import { useState } from 'react';
import './Login.css';
import CabecalhoAuth from '../../components/Auth/CabecalhoAuth.jsx';
import PainelAuth from '../../components/Auth/PainelAuth.jsx';
import FormularioAuth from '../../components/Auth/FormularioAuth.jsx';
import { criarContaUsuario, entrarNaConta } from '../../services/autenticacaoService.js';

function gerarUsuario(nome) {
  return nome
    .toLowerCase()
    .trim();
}

export default function Login({ aoAutenticar }) {
  const [modo, setModo] = useState('entrar');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [dadosLogin, setDadosLogin] = useState({ identificador: '', senha: '' });
  const [dadosCadastro, setDadosCadastro] = useState({
    nome: '',
    username: '',
    idade: 18,
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  function limparMensagens() {
    setErro('');
    setMensagem('');
  }

  function alternarModo(novoModo) {
    setModo(novoModo);
    limparMensagens();
  }

  async function submeterEntrar() {
    const usuario = await entrarNaConta(dadosLogin);
    aoAutenticar(usuario);
    setMensagem('Acesso liberado.');
  }

  async function submeterCriar() {
    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      throw new Error('As senhas não coincidem.');
    }

    const nome = dadosCadastro.nome.trim();
    const usuarioGerado = dadosCadastro.username.trim() || gerarUsuario(nome || dadosCadastro.email);

    const usuario = await criarContaUsuario({
      nome,
      idade: Number(dadosCadastro.idade) || 18,
      email: dadosCadastro.email.trim(),
      username: usuarioGerado,
      senha: dadosCadastro.senha,
      descricao: `${nome || 'Usuário'} está usando a plataforma para revisar literatura.`,
      descricao_en: `${nome || 'User'} is using the platform to review literature.`,
    });

    aoAutenticar(usuario);
    setMensagem('Conta criada com sucesso.');
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();
    limparMensagens();

    try {
      setCarregando(true);

      if (modo === 'entrar') {
        await submeterEntrar();
      } else {
        await submeterCriar();
      }
    } catch (error) {
      setErro(error.message || 'Não foi possível concluir a operação.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="paginaLogin">
      <CabecalhoAuth
        modo={modo}
        aoAlternarModo={() => alternarModo(modo === 'entrar' ? 'criar' : 'entrar')}
      />

      <main className="conteudoLogin">
        <section className="cartaoLogin">
          <PainelAuth />

          <FormularioAuth
            modo={modo}
            dadosLogin={dadosLogin}
            dadosCadastro={dadosCadastro}
            carregando={carregando}
            erro={erro}
            mensagem={mensagem}
            mostrarSenha={mostrarSenha}
            aoMudarModo={alternarModo}
            aoMudarLogin={(evento) => {
              const { name, value } = evento.target;
              setDadosLogin((atual) => ({ ...atual, [name]: value }));
            }}
            aoMudarCadastro={(evento) => {
              const { name, value } = evento.target;
              setDadosCadastro((atual) => ({ ...atual, [name]: value }));
            }}
            aoAlternarSenha={() => setMostrarSenha((valor) => !valor)}
            aoSubmit={enviarFormulario}
          />
        </section>
      </main>
    </div>
  );
}