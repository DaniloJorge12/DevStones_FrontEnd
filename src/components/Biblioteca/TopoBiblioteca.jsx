import { Search } from 'lucide-react';
import './TopoBiblioteca.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const textos = {
  pt: {
    selo: 'Biblioteca integrada',
    titulo: 'Biblioteca integrada',
    descricao:
      'Explore as obras, encontre resumos e acompanhe os materiais de literatura da plataforma. Os dados já ficam prontos para vir do backend quando o endpoint estiver disponível.',
    placeholder: 'Buscar livro, autor ou tema',
    livros: (n) => `${n} livros`,
  },
  en: {
    selo: 'Integrated library',
    titulo: 'Integrated library',
    descricao:
      'Explore the works, find summaries, and browse the literature materials on the platform. Data is ready to be fetched from the backend once the endpoint is available.',
    placeholder: 'Search book, author or topic',
    livros: (n) => `${n} books`,
  },
};

export default function TopoBiblioteca({ totalLivros, valorBusca, aoMudarBusca }) {
  const { idioma } = useIdioma();
  const t = textos[idioma];

  return (
    <section className="topoBiblioteca">
      <div className="textoTopoBiblioteca">
        <span className="seloTopoBiblioteca">{t.selo}</span>
        <h1>{t.titulo}</h1>
        <p>{t.descricao}</p>
      </div>

      <label className="buscaBiblioteca" htmlFor="busca-livros">
        <Search size={18} />
        <input
          id="busca-livros"
          type="search"
          value={valorBusca}
          onChange={aoMudarBusca}
          placeholder={t.placeholder}
        />
        <span className="contadorBiblioteca">{t.livros(totalLivros)}</span>
      </label>
    </section>
  );
}