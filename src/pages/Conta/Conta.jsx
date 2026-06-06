import { useState, useEffect, useRef } from 'react';
import { User, Mail, AtSign, Settings, Save, Camera } from 'lucide-react';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import './Conta.css';

export default function Conta({ usuario, aoSair }) {
    const { idioma } = useIdioma();
    const inputRef = useRef(null);
    

    const usuarioSeguro = usuario || {
        id: 'visitante_123',
        nome: 'Visitante',
        username: 'visitante',
        email: 'visitante@devstone.com',
        descricao: 'Bem-vindo à plataforma DevStone.',
    };

    const [editando, setEditando] = useState(false);
    const [fotoLocal, setFotoLocal] = useState('');
    const [nomeEditado, setNomeEditado] = useState(usuarioSeguro.nome);

    useEffect(() => {

        const foto = localStorage.getItem(`foto_perfil_${usuarioSeguro.id}`);
        if (foto) setFotoLocal(foto);


        const nome = localStorage.getItem(`nome_perfil_${usuarioSeguro.id}`);
        if (nome) setNomeEditado(nome);
    }, [usuarioSeguro.id]);

    const textos = {
        pt: {
            titulo: 'Minha Conta',
            subtitulo: 'Gerencie suas informações de perfil e preferências.',
            perfil: 'Perfil Público',
            dados: 'Dados Pessoais',
            nome: 'Nome Completo',
            usuario: 'Nome de Usuário',
            email: 'E-mail',
            bio: 'Biografia (O que os outros veem)',
            editar: 'Editar Perfil',
            salvar: 'Salvar Alterações',
            cancelar: 'Salvar',
            alterarFoto: 'Alterar foto'
        },
        en: {
            titulo: 'My Account',
            subtitulo: 'Manage your profile information and preferences.',
            perfil: 'Public Profile',
            dados: 'Personal Data',
            nome: 'Full Name',
            usuario: 'Username',
            email: 'Email',
            bio: 'Biography (What others see)',
            editar: 'Edit Profile',
            salvar: 'Save Changes',
            cancelar: 'Save',
            alterarFoto: 'Change photo'
        }
    };

    const t = textos[idioma] || textos.pt;

    function handleSalvar(e) {
        e.preventDefault();
        

        localStorage.setItem(`nome_perfil_${usuarioSeguro.id}`, nomeEditado);
        setEditando(false);
        
        alert(idioma === 'pt' ? 'Perfil atualizado (simulação)! A foto e o nome foram salvos localmente.' : 'Profile updated (simulation)! Photo and name saved locally.');
        

        window.dispatchEvent(new Event('storage'));
    }

    function aoEscolherFoto(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setFotoLocal(base64String);
            localStorage.setItem(`foto_perfil_${usuarioSeguro.id}`, base64String);

            window.dispatchEvent(new Event('storage'));
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="paginaConta">
            <MenuLateral itemAtivo="Conta" aoSair={aoSair} />

            <div className="conteudoConta">
                <Cabecalho usuario={usuarioSeguro} aoSair={aoSair} />

                <main className="areaConta">
                    <div className="interiorConta">
                        <div className="topoConta">
                            <div className="iconeContaCabecalho">
                                <Settings size={28} />
                            </div>
                            <div>
                                <h1>{t.titulo}</h1>
                                <p>{t.subtitulo}</p>
                            </div>
                        </div>

                        <div className="cartoesConta">
                            <section className="cartaoPerfil">
                                <div className="avatarWrapper">
                                    <div className="avatarGrande">
                                        {fotoLocal ? (
                                            <img src={fotoLocal} alt="Avatar do usuário" className="imagemAvatar" />
                                        ) : (
                                            <User size={48} />
                                        )}
                                    </div>
                                    {editando && (
                                        <button 
                                            className="botaoAlterarFoto" 
                                            onClick={() => inputRef.current?.click()}
                                            title={t.alterarFoto}
                                        >
                                            <Camera size={18} />
                                        </button>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        ref={inputRef}
                                        style={{ display: 'none' }}
                                        onChange={aoEscolherFoto}
                                    />
                                </div>
                                
                                <h2>{nomeEditado}</h2>
                                <span>@{usuarioSeguro.username}</span>
                                <p className="bioExibicao">{usuarioSeguro.descricao}</p>
                                
                                {!editando && (
                                    <button 
                                        className="botaoEditarConta"
                                        onClick={() => setEditando(true)}
                                    >
                                        {t.editar}
                                    </button>
                                )}
                            </section>

                            <section className="cartaoDados">
                                <h3>{t.dados}</h3>
                                
                                <form onSubmit={handleSalvar} className="formularioConta">
                                    <div className="grupoCampoConta">
                                        <label>
                                            <User size={14} /> {t.nome}
                                        </label>
                                        <input 
                                            type="text" 
                                            value={nomeEditado}
                                            onChange={(e) => setNomeEditado(e.target.value)}
                                            disabled={!editando}
                                        />
                                    </div>

                                    <div className="grupoCampoConta">
                                        <label>
                                            <AtSign size={14} /> {t.usuario}
                                        </label>
                                        <input 
                                            type="text" 
                                            value={usuarioSeguro.username}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className="grupoCampoConta">
                                        <label>
                                            <Mail size={14} /> {t.email}
                                        </label>
                                        <input 
                                            type="email" 
                                            value={usuarioSeguro.email}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className="grupoCampoConta">
                                        <label>
                                            {t.bio}
                                        </label>
                                        <textarea 
                                            value={usuarioSeguro.descricao}
                                            disabled={true}
                                            rows="3"
                                        />
                                    </div>

                                    {editando && (
                                        <div className="acoesConta">
                                            <button 
                                                type="button" 
                                                className="botaoCancelarConta"
                                                onClick={() => setEditando(false)}
                                            >
                                                {t.cancelar}
                                            </button>
                                            <button type="submit" className="botaoSalvarConta">
                                                <Save size={16} />
                                                {t.salvar}
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </section>
                        </div>
                    </div>
                </main>

                <Rodape />
            </div>
        </div>
    );
}
