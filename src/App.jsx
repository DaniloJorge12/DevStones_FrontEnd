import { useEffect, useState } from 'react';
import Home from './pages/Home/Home.jsx';
import Biblioteca from './pages/Biblioteca/Biblioteca.jsx';
import Sobre from './pages/Sobre/Sobre.jsx';
import Login from './pages/Login/Login.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import LivroPrincipal from './pages/LivroPrincipal/LivroPrincipal.jsx';
import Simulados from './pages/Simulados/Simulados.jsx';
import {
    limparUsuarioAutenticado,
    obterUsuarioAutenticado,
    salvarUsuarioAutenticado,
} from './services/authStorage.js';

function obterPaginaAtual() {
    const pathname = window.location.pathname.toLowerCase();
    if (pathname === '/' || pathname === '') return 'home';
    if (pathname.startsWith('/login')) return 'login';
    if (pathname.startsWith('/biblioteca')) return 'biblioteca';
    if (pathname.startsWith('/sobre')) return 'sobre';
    if (pathname.startsWith('/livro')) return 'livro';
    if (pathname.startsWith('/simulados')) return 'simulados';
    return 'notfound';
}

export default function App() {
    const [usuario, setUsuario] = useState(() => obterUsuarioAutenticado());
    const [paginaAtual, setPaginaAtual] = useState(obterPaginaAtual);

    useEffect(() => {
        const atualizarPagina = () => setPaginaAtual(obterPaginaAtual());
        window.addEventListener('popstate', atualizarPagina);
        return () => window.removeEventListener('popstate', atualizarPagina);
    }, []);

    const paginaEfetiva = usuario
        ? (paginaAtual === 'login' ? 'home' : paginaAtual)
        : (paginaAtual === 'login' || paginaAtual === 'notfound' ? paginaAtual : 'login');

    function autenticar(usuarioAutenticado) {
        salvarUsuarioAutenticado(usuarioAutenticado);
        setUsuario(usuarioAutenticado);
        window.history.pushState({}, '', '/');
        setPaginaAtual('home');
    }

    function sair() {
        limparUsuarioAutenticado();
        setUsuario(null);
        window.history.pushState({}, '', '/login');
        setPaginaAtual('login');
    }

    if (paginaEfetiva === 'login')      return <Login aoAutenticar={autenticar} />;
    if (paginaEfetiva === 'biblioteca') return <Biblioteca usuario={usuario} aoSair={sair} />;
    if (paginaEfetiva === 'sobre')      return <Sobre usuario={usuario} aoSair={sair} />;
    if (paginaEfetiva === 'simulados')  return <Simulados usuario={usuario} aoSair={sair} />;
    if (paginaEfetiva === 'notfound')   return <NotFound />;
    if (paginaEfetiva === 'livro')      return <LivroPrincipal usuario={usuario} aoSair={sair} />;

    return <Home usuario={usuario} aoSair={sair} />;
}