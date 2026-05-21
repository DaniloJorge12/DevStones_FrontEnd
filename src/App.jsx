import { useEffect, useState } from 'react';
import Home from './pages/Home/Home.jsx';
import Biblioteca from './pages/Biblioteca/Biblioteca.jsx';
import Sobre from './pages/Sobre/Sobre.jsx';
import Login from './pages/Login/Login.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import LivroPrincipal from './pages/LivroPrincipal/LivroPrincipal.jsx';
import {
	limparUsuarioAutenticado,
	obterAcessoDev,
	obterUsuarioAutenticado,
	salvarAcessoDev,
	salvarUsuarioAutenticado,
} from './services/authStorage.js';

function obterPaginaAtual() {
	const pathname = window.location.pathname.toLowerCase();
	if (pathname === '/' || pathname === '') {
		return 'home';
	}

	if (pathname.startsWith('/login')) {
		return 'login';
	}

	if (pathname.startsWith('/biblioteca')) {
		return 'biblioteca';
	}

	if (pathname.startsWith('/sobre')) {
		return 'sobre';
	}

	if (pathname.startsWith('/livro')) {
		return 'livro';
	}

	return 'notfound';
}

export default function App() {
	const [usuario, setUsuario] = useState(() => obterUsuarioAutenticado());
	const [acessoDev, setAcessoDev] = useState(() => obterAcessoDev());
	const [paginaAtual, setPaginaAtual] = useState(obterPaginaAtual);

	useEffect(() => {
		const atualizarPagina = () => {
			setPaginaAtual(obterPaginaAtual());
		};

		const alternarAcessoDev = (evento) => {
			if (evento.key?.toLowerCase() !== 'f') {
				return;
			}

			salvarAcessoDev(true);
			setAcessoDev(true);
			window.history.pushState({}, '', '/');
			setPaginaAtual('home');
		};

		window.addEventListener('popstate', atualizarPagina);
		window.addEventListener('keydown', alternarAcessoDev);

		return () => {
			window.removeEventListener('popstate', atualizarPagina);
			window.removeEventListener('keydown', alternarAcessoDev);
		};
	}, []);

	const paginaEfetiva = usuario || acessoDev
		? (paginaAtual === 'login' ? 'home' : paginaAtual)
		: (paginaAtual === 'login' || paginaAtual === 'notfound' ? paginaAtual : 'login');

	function autenticar(usuarioAutenticado) {
		const usuarioNormalizado = salvarUsuarioAutenticado(usuarioAutenticado);
		setUsuario(usuarioNormalizado);
		salvarAcessoDev(false);
		setAcessoDev(false);
		window.history.pushState({}, '', '/');
		setPaginaAtual('home');
	}

	function sair() {
		limparUsuarioAutenticado();
		salvarAcessoDev(false);
		setUsuario(null);
		setAcessoDev(false);
		window.history.pushState({}, '', '/login');
		setPaginaAtual('login');
	}

	if (paginaEfetiva === 'login') {
		return <Login aoAutenticar={autenticar} />;
	}

	if (paginaEfetiva === 'biblioteca') {
		return <Biblioteca usuario={usuario} aoSair={sair} />;
	}

	if (paginaEfetiva === 'sobre') {
		return <Sobre usuario={usuario} aoSair={sair} />;
	}

	if (paginaEfetiva === 'notfound') {
		return <NotFound />;
	}

	if (paginaEfetiva === 'livro') {
		return (
			<LivroPrincipal
				usuario={usuario}
				aoSair={sair}
			/>
		);
	}

	return <Home usuario={usuario} aoSair={sair} />;
}
