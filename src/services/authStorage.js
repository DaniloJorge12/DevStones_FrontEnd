const CHAVE_USUARIO = 'devstone_usuario_logado';
const CHAVE_DEV = 'devstone_acesso_liberado';

export function obterUsuarioAutenticado() {
  try {
    const valor = window.localStorage.getItem(CHAVE_USUARIO);
    return valor ? JSON.parse(valor) : null;
  } catch {
    return null;
  }
}

export function salvarUsuarioAutenticado(usuario) {
  window.localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
  return usuario;
}

export function limparUsuarioAutenticado() {
  window.localStorage.removeItem(CHAVE_USUARIO);
}

export function obterAcessoDev() {
  return window.sessionStorage.getItem(CHAVE_DEV) === '1';
}

export function salvarAcessoDev(liberado) {
  if (liberado) {
    window.sessionStorage.setItem(CHAVE_DEV, '1');
    return;
  }

  window.sessionStorage.removeItem(CHAVE_DEV);
}