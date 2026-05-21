import { Bell, Globe } from 'lucide-react';
import './Cabecalho.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

export default function Cabecalho({ usuario, aoSair }) {
  const nomeExibido = usuario?.nome || usuario?.username || 'Usuário';
  const emailExibido = usuario?.email || 'acesso@devstone';
  const fotoExibida = usuario?.foto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';

  const { idioma, alternarIdioma } = useIdioma();

  const ativo = idioma === 'pt' ? 'PT' : 'EN';
  const inativo = idioma === 'pt' ? 'EN' : 'PT';

  return (
      <header className="cabecalho">
          <div className="marca">
              <img src={"/src/assets/img/icon.png"} alt="D" className="icon" />
              <span className="nomeMarca">
                  Dev<span>Stone</span>
              </span>
          </div>

          <div className="acoesCabecalho">
              <button
                className="botaoIdioma"
                type="button"
                aria-label="Selecionar idioma"
                onClick={alternarIdioma}
              >
                  <Globe size={16} />
                  <span>{ativo}</span>
                  <span className="divisorIdioma" aria-hidden="true" />
                  <span className="idiomaSecundario">{inativo}</span>
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
                              {idioma === 'pt' ? 'Sair' : 'Sign out'}
                          </button>
                      ) : null}
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