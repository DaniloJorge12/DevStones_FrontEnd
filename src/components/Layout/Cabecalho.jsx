import { Globe, User, ImageIcon, LogOut } from 'lucide-react';
import './Cabecalho.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import { useEffect, useRef, useState } from 'react';

export default function Cabecalho({ usuario, aoSair }) {
    const nomeExibido = usuario?.nome || usuario?.username || 'Usuário';
    const emailExibido = usuario?.email || 'acesso@devstone';

    const fotoPadrao =
        'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/Gemini_Generated_Image_n3chkun3chkun3ch.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9HZW1pbmlfR2VuZXJhdGVkX0ltYWdlX24zY2hrdW4zY2hrdW4zY2gucG5nIiwiaWF0IjoxNzc5NzI5MzIzLCJleHAiOjE4MTEyNjUzMjN9.rkSvST-GWX2LlJdco7S5eSxmZkSYLUrDkeYWaC5oTjY';

    const [menuAberto, setMenuAberto] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState(fotoPadrao);

    const inputRef = useRef(null);
    const menuRef = useRef(null);

    const { idioma, alternarIdioma } = useIdioma();

    const ativo = idioma === 'pt' ? 'PT' : 'EN';
    const inativo = idioma === 'pt' ? 'EN' : 'PT';

    useEffect(() => {
        const fotoSalva = localStorage.getItem('fotoPerfilDevStone');

        if (fotoSalva) {
            setFotoPerfil(fotoSalva);
        } else if (usuario?.foto) {
            setFotoPerfil(usuario.foto);
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

        if (!arquivo) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const imagemBase64 = reader.result;

            setFotoPerfil(imagemBase64);
            localStorage.setItem('fotoPerfilDevStone', imagemBase64);
        };

        reader.readAsDataURL(arquivo);
    };

    return (
        <header className="cabecalho">
            <div className="marca">
                <img
                    src="https://ejriuxfncwbsvebswmtg.supabase.co/storage/v1/object/public/arquivos/icon.png"
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
                                <button className="itemMenuPerfil">
                                    <User size={16} />
                                    Conta
                                </button>

                                <button
                                    className="itemMenuPerfil"
                                    onClick={() => inputRef.current?.click()}>
                                    <ImageIcon size={16} />
                                    Alterar imagem
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
