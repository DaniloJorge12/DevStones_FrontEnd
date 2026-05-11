import './Home.css';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import LivroDestaque from '../../components/FeaturedBook/LivroDestaque.jsx';
import AtalhosRapidos from '../../components/ShortcutsGrid/AtalhosRapidos.jsx';

export default function Home({ usuario, aoSair }) {
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
    </div>
  );
}