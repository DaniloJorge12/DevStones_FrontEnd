import CartaoLivro from './CartaoLivro.jsx';
import './GradeLivros.css';

export default function GradeLivros({ livros }) {
  return (
    <section className="secaoLivros" aria-label="Livros disponíveis">
      <div className="tituloSecaoLivros">
        <h2>Obras disponíveis</h2>
        <p>Escolha uma obra para acessar a análise, resumos e materiais de apoio.</p>
      </div>

      <div className="gradeLivros">
        {livros.map((livro) => (
          <CartaoLivro key={livro.id} livro={livro} />
        ))}
      </div>
    </section>
  );
}