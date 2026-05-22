const CHAVE_USUARIO = 'devstone_usuario_logado';

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