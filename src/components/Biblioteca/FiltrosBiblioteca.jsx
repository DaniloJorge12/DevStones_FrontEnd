import './FiltrosBiblioteca.css';

export default function FiltrosBiblioteca({ filtros, filtroAtivo, aoSelecionarFiltro }) {
  return (
    <section className="filtrosBiblioteca" aria-label="Filtros da biblioteca">
      {filtros.map((filtro) => (
        <button
          key={filtro.valor}
          type="button"
          className={`botaoFiltro ${filtroAtivo === filtro.valor ? 'botaoFiltroAtivo' : ''}`}
          onClick={() => aoSelecionarFiltro(filtro.valor)}
        >
          {filtro.rotulo}
          <span>{filtro.total}</span>
        </button>
      ))}
    </section>
  );
}