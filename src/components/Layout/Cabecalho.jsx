import { Globe, User, ImageIcon, LogOut } from 'lucide-react';
import './Cabecalho.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import { useEffect, useRef, useState } from 'react';

export default function Cabecalho({ usuario, aoSair }) {
    const emailExibido = usuario?.email || 'acesso@devstone';

    const fotoPadrao =
        'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/profile.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9wcm9maWxlLnBuZyIsImlhdCI6MTc3OTczMTA0MCwiZXhwIjoxODExMjY3MDQwfQ.k4u49L8GnSxyX2erfF9CVelwH5FbiwrRV6taVOMIOug';

    const [menuAberto, setMenuAberto] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState(fotoPadrao);
    const [nomeExibido, setNomeExibido] = useState(usuario?.nome || usuario?.username || 'Usuário');

    const inputRef = useRef(null);
    const menuRef = useRef(null);

    const { idioma, alternarIdioma } = useIdioma();

    const ativo = idioma === 'pt' ? 'PT' : 'EN';
    const inativo = idioma === 'pt' ? 'EN' : 'PT';

    useEffect(() => {
        if (!usuario) return;
        const fotoSalva = localStorage.getItem(`foto_perfil_${usuario.id}`);
        const nomeSalvo = localStorage.getItem(`nome_perfil_${usuario.id}`);

        if (fotoSalva) {
            setFotoPerfil(fotoSalva);
        } else if (usuario?.foto) {
            setFotoPerfil(usuario.foto);
        }

        if (nomeSalvo) {
            setNomeExibido(nomeSalvo);
        } else {
            setNomeExibido(usuario.nome || usuario.username || 'Usuário');
        }
    }, [usuario]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAberto(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const alterarImagem = (event) => {
        const arquivo = event.target.files?.[0];

        if (!arquivo || !usuario) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const imagemBase64 = reader.result;

            setFotoPerfil(imagemBase64);
            localStorage.setItem(`foto_perfil_${usuario.id}`, imagemBase64);
        };

        reader.readAsDataURL(arquivo);
    };

    return (
        <header className="cabecalho">
            <div className="marca">
                <img
                    src="https://github.com/DaniloJorge12/DevStones_FrontEnd/blob/main/src/assets/img/icon.png?raw=true"
                    alt="D"
                    className="icon"
                />

                <span className="nomeMarca">
                    Dev<span>Stone</span>
                </span>
            </div>

            <div className="acoesCabecalho">
                <button
                    className="botaoIdioma"
                    type="button"
                    aria-label="Selecionar idioma"
                    onClick={alternarIdioma}>
                    <Globe size={16} />
                    <span>{ativo}</span>
                    <span className="divisorIdioma" aria-hidden="true" />
                    <span className="idiomaSecundario">{inativo}</span>
                </button>

                {usuario ? (
                    <div className="perfilCabecalho" ref={menuRef}>
                        <div className="dadosPerfil">
                            <strong>{nomeExibido}</strong>
                            <span>{emailExibido}</span>
                        </div>

                        <img
                            src={fotoPerfil}
                            alt="Foto do usuário"
                            className="avatarPerfil"
                            onClick={() => setMenuAberto(!menuAberto)}
                        />

                        {menuAberto && (
                            <div className="menuPerfil">
                                <button 
                                    className="itemMenuPerfil"
                                    onClick={() => {
                                        setMenuAberto(false);
                                        window.history.pushState({}, '', '/conta');
                                        window.dispatchEvent(new PopStateEvent('popstate'));
                                    }}
                                >
                                    <User size={16} />
                                    {idioma === 'pt' ? 'Conta' : 'Account'}
                                </button>

                                <button
                                    className="itemMenuPerfil"
                                    onClick={() => {
                                        inputRef.current?.click();
                                        setMenuAberto(false);
                                    }}
                                >
                                    <ImageIcon size={16} />
                                    {idioma === 'pt' ? 'Alterar imagem' : 'Change image'}
                                </button>

                                {aoSair && (
                                    <button className="itemMenuPerfil sair" onClick={aoSair}>
                                        <LogOut size={16} />
                                        {idioma === 'pt' ? 'Sair' : 'Sign out'}
                                    </button>
                                )}

                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={alterarImagem}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <a className="botaoEntrarCabecalho" href="/login">
                        {idioma === 'pt' ? 'Entrar' : 'Sign in'}
                    </a>
                )}
            </div>
        </header>
    );
}
