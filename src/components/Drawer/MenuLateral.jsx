import {Home,
BookOpen,
Library,
FileText,
GraduationCap,
MessageSquare,
LogOut,
PlayCircle,
CircleCheck,
InfoIcon,
} from 'lucide-react';
import './MenuLateral.css';

const itensMenu = [
    { icone: Home, texto: 'Início', href: '/' },
    { icone: BookOpen, texto: 'O Livro Principal', href: '/livro' },
    { icone: Library, texto: 'Biblioteca', href: '/biblioteca' },
    { icone: MessageSquare, texto: 'Comunidade & Dicas', href: '/comunidade' },
    { icone: CircleCheck, texto: 'Simulados & Quiz', href: '/simulados' },
    { icone: PlayCircle, texto: 'Videoaulas', href: '/videoaulas' },
    { icone: InfoIcon, texto: 'Sobre nós', href: '/sobre' },
];

function ItemMenu({ icone, texto, ativo = false, href, itemAtivo, aoSair }) {
  const Icone = icone;
  const estaAtivo = ativo || itemAtivo === texto;

  if (href) {
    return (
      <a
        className={`itemMenu ${estaAtivo ? 'itemMenuAtivo' : ''}`}
        href={href}
        onClick={(evento) => {
          evento.preventDefault();
          window.history.pushState({}, '', href);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        aria-label={texto}
        title={texto}
      >
        <Icone size={20} className={`iconeMenu ${estaAtivo ? 'iconeMenuAtivo' : ''}`} />
        <span className="textoMenu">{texto}</span>
      </a>
    );
  }

  return (
    <button
      className={`itemMenu ${estaAtivo ? 'itemMenuAtivo' : ''}`}
      type="button"
      aria-label={texto}
      title={texto}
      onClick={aoSair}
    >
      <Icone size={20} className={`iconeMenu ${estaAtivo ? 'iconeMenuAtivo' : ''}`} />
      <span className="textoMenu">{texto}</span>
    </button>
  );
}

export default function MenuLateral({ itemAtivo = 'Início', aoSair }) {
  return (
    <aside className="menuLateral">
      <div>
        <div className="cabecalhoMenu">
          <span className="tituloMenu">Menu de navegação</span>
        </div>

        <nav className="listaMenu" aria-label="Menu principal">
          {itensMenu.map((item) => (
            <ItemMenu
              key={item.texto}
              icone={item.icone}
              texto={item.texto}
              ativo={item.ativo}
              href={item.href}
              itemAtivo={itemAtivo}
            />
          ))}
        </nav>
      </div>

      <div className="menuInferior">
        <ItemMenu icone={LogOut} texto="Sair" itemAtivo={itemAtivo} aoSair={aoSair} />
      </div>
    </aside>
  );
};
