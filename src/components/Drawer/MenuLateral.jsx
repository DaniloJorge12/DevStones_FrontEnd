import {
    Home,
    BookOpen,
    Library,
    MessageSquare,
    PlayCircle,
    CircleCheck,
    InfoIcon,
    LogOut,
    User,
} from 'lucide-react';
import './MenuLateral.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const itensMenu = {
    pt: [
        { icone: Home, texto: 'Início', href: '/' },
        { icone: BookOpen, texto: 'O Livro Principal', href: '/livro' },
        { icone: Library, texto: 'Biblioteca', href: '/biblioteca' },
        { icone: MessageSquare, texto: 'Comunidade & Dicas', href: '/comunidade' },
        { icone: CircleCheck, texto: 'Simulados & Quiz', href: '/simulados' },
        { icone: PlayCircle, texto: 'Videoaulas', href: '/videoaulas' },
        { icone: InfoIcon, texto: 'Sobre nós', href: '/sobre' },
        { icone: User, texto: 'Conta', href: '/conta' },
    ],
    en: [
        { icone: Home, texto: 'Home', href: '/' },
        { icone: BookOpen, texto: 'Main Book', href: '/livro' },
        { icone: Library, texto: 'Library', href: '/biblioteca' },
        { icone: MessageSquare, texto: 'Community & Tips', href: '/comunidade' },
        { icone: CircleCheck, texto: 'Practice & Quiz', href: '/simulados' },
        { icone: PlayCircle, texto: 'Video Lessons', href: '/videoaulas' },
        { icone: InfoIcon, texto: 'About us', href: '/sobre' },
        { icone: User, texto: 'Account', href: '/conta' },
    ],
};


const itemAtivoMap = {
    Início: 'Home',
    'O Livro Principal': 'Main Book',
    Biblioteca: 'Library',
    'Comunidade & Dicas': 'Community & Tips',
    'Simulados & Quiz': 'Practice & Quiz',
    Videoaulas: 'Video Lessons',
    'Sobre nós': 'About us',
    Conta: 'Account',
};

function ItemMenu({ icone, texto, href, itemAtivoTexto, aoSair }) {
    const Icone = icone;
    const estaAtivo = itemAtivoTexto === texto;

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
                title={texto}>
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
            onClick={aoSair}>
            <Icone size={20} className={`iconeMenu ${estaAtivo ? 'iconeMenuAtivo' : ''}`} />
            <span className="textoMenu">{texto}</span>
        </button>
    );
}

export default function MenuLateral({ itemAtivo = 'Início', aoSair }) {
    const { idioma } = useIdioma();
    const lista = itensMenu[idioma];


    const itemAtivoTraduzido = idioma === 'en' ? (itemAtivoMap[itemAtivo] ?? itemAtivo) : itemAtivo;

    const labelMenu = idioma === 'pt' ? 'Menu de navegação' : 'Navigation menu';
    const labelSair = idioma === 'pt' ? 'Sair' : 'Sign out';

    return (
        <aside className="menuLateral">
            <div>
                <div className="cabecalhoMenu">
                    <span className="tituloMenu">{labelMenu}</span>
                </div>

                <nav className="listaMenu" aria-label={labelMenu}>
                    {lista.map((item) => (
                        <ItemMenu
                            key={item.href}
                            icone={item.icone}
                            texto={item.texto}
                            href={item.href}
                            itemAtivoTexto={itemAtivoTraduzido}
                        />
                    ))}
                </nav>
            </div>

            <div className="menuInferior">
                <ItemMenu
                    icone={LogOut}
                    texto={labelSair}
                    itemAtivoTexto={itemAtivoTraduzido}
                    aoSair={aoSair}
                />
            </div>
        </aside>
    );
}
