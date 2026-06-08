import { useState } from 'react';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import './Home.css';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import LivroDestaque from '../../components/FeaturedBook/LivroDestaque.jsx';
import AtalhosRapidos from '../../components/ShortcutsGrid/AtalhosRapidos.jsx';

export default function Home({ usuario, aoSair }) {
  const { idioma } = useIdioma();
  const [mostrarPopup, setMostrarPopup] = useState(() => localStorage.getItem('cadastroRecente') === 'true');

  const textos = {
    pt: {
      titulo: 'Obrigado por criar uma conta no DevStones!',
      continuar: 'Continuar'
    },
    en: {
      titulo: 'Thank you for creating a DevStones account!',
      continuar: 'Continue'
    }
  };
  const t = textos[idioma] || textos.pt;

  const fecharPopup = () => {
    localStorage.removeItem('cadastroRecente');
    setMostrarPopup(false);
  };

  return (
    <div className="paginaHome">
      <MenuLateral aoSair={aoSair} />

      <div className="conteudoHome">
        <Cabecalho usuario={usuario} aoSair={aoSair} />

        <main className="areaPrincipal">
          <div className="conteudoPrincipal">
            <HeroSection />
            <LivroDestaque />
            <AtalhosRapidos />
          </div>
        </main>

        <Rodape />
      </div>

      {mostrarPopup && (
        <div className="overlayBoasVindas">
          <div className="modalBoasVindas">
            <h2>{t.titulo}</h2>
            <video
              src="https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/ad0ea867-a736-47db-8e53-14911efa979e.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9hZDBlYTg2Ny1hNzM2LTQ3ZGItOGU1My0xNDkxMWVmYTk3OWUubXA0IiwiaWF0IjoxNzgwODgyMDMxLCJleHAiOjE4MTI0MTgwMzF9.x57DnKHboUfjuERdAwTm3rvbeot_9pLJjKZsAt5zluw"
              autoPlay
              muted
              playsInline
              onLoadedMetadata={(e) => {
                e.target.currentTime = 2;
                e.target.play().catch(() => {});
              }}
              onEnded={(e) => {
                e.target.currentTime = 2;
                e.target.play().catch(() => {});
              }}
              className="videoBoasVindas"
            />
            <button className="botaoContinuar" onClick={fecharPopup}>
              {t.continuar}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}