function obterBaseUrl() {
  return (import.meta.env.VITE_API_BACKEND_URL || '').replace(/\/$/, '');
}

function obterCabecalhos() {
  const cabecalhos = {
    'Content-Type': 'application/json',
  };

  const apiKey = import.meta.env.VITE_API_KEY;

  if (apiKey) {
    cabecalhos['x-api-key'] = apiKey;
  }

  return cabecalhos;
}

async function interpretarResposta(resposta, mensagemPadrao) {
  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.error || dados?.message || mensagemPadrao);
  }

  return dados?.data ?? dados;
}

export async function entrarNaConta({ identificador, senha }) {
  const baseUrl = obterBaseUrl();

  if (!baseUrl) {
    throw new Error('Configure VITE_API_BACKEND_URL para conectar ao backend.');
  }

  const resposta = await fetch(`${baseUrl}/api/usuario/login`, {
    method: 'POST',
    headers: obterCabecalhos(),
    body: JSON.stringify({ identificador, senha }),
  });

  return interpretarResposta(resposta, 'Não foi possível entrar na conta.');
}

export async function criarContaUsuario(dadosUsuario) {
  const baseUrl = obterBaseUrl();

  if (!baseUrl) {
    throw new Error('Configure VITE_API_BACKEND_URL para conectar ao backend.');
  }

  const resposta = await fetch(`${baseUrl}/api/usuario`, {
    method: 'POST',
    headers: obterCabecalhos(),
    body: JSON.stringify(dadosUsuario),
  });

  return interpretarResposta(resposta, 'Não foi possível criar a conta.');
}