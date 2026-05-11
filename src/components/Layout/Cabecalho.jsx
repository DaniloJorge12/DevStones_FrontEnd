import { Bell, Globe } from 'lucide-react';
import './Cabecalho.css';

export default function Cabecalho({ usuario, aoSair }) {
  const nomeExibido = usuario?.nome || usuario?.username || 'Usuário';
  const emailExibido = usuario?.email || 'acesso@devstone';
  const fotoExibida = usuario?.foto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';

  return (
    <header className="cabecalho">
      <div className="marca">
        <div className="logoMarca">D</div>
        <span className="nomeMarca">
          Dev<span>Stone</span>
        </span>
      </div>

      <div className="acoesCabecalho">
        <button className="botaoIdioma" type="button" aria-label="Selecionar idioma">
          <Globe size={16} />
          <span>PT</span>
          <span className="divisorIdioma" aria-hidden="true" />
          <span className="idiomaSecundario">EN</span>
        </button>

        <button className="botaoNotificacao" type="button" aria-label="Abrir notificações">
          <Bell size={18} />
        </button>

        {usuario ? (
          <div className="perfilCabecalho">
            <div className="dadosPerfil">
              <strong>{nomeExibido}</strong>
              <span>{emailExibido}</span>
            </div>

            <img src={fotoExibida} alt="Foto do usuário" className="avatarPerfil" />

            {aoSair ? (
              <button className="botaoSairCabecalho" type="button" onClick={aoSair}>
                Sair
              </button>
            ) : null}
          </div>
        ) : (
          <a className="botaoEntrarCabecalho" href="/login">
            Entrar
          </a>
        )}
      </div>
    </header>
  );
}