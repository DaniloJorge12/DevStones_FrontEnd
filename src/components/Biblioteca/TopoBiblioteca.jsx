import { Search } from 'lucide-react';
import './TopoBiblioteca.css';

export default function TopoBiblioteca({ totalLivros, valorBusca, aoMudarBusca }) {
  return (
    <section className="topoBiblioteca">
      <div className="textoTopoBiblioteca">
        <span className="seloTopoBiblioteca">Biblioteca integrada</span>
        <h1>Biblioteca integrada</h1>
        <p>
          Explore as obras, encontre resumos e acompanhe os materiais de literatura da
          plataforma. Os dados já ficam prontos para vir do backend quando o endpoint estiver
          disponível.
        </p>
      </div>

      <label className="buscaBiblioteca" htmlFor="busca-livros">
        <Search size={18} />
        <input
          id="busca-livros"
          type="search"
          value={valorBusca}
          onChange={aoMudarBusca}
          placeholder="Buscar livro, autor ou tema"
        />
        <span className="contadorBiblioteca">{totalLivros} livros</span>
      </label>
    </section>
  );
}