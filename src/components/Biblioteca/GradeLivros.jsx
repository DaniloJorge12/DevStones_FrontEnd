import CartaoLivro from './CartaoLivro.jsx';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import './GradeLivros.css';

export default function GradeLivros({ livros }) {
  const { idioma } = useIdioma();
  
  const textos = {
      pt: {
          titulo: 'Obras disponíveis',
          subtitulo: 'Escolha uma obra para acessar a análise, resumos e materiais de apoio.'
      },
      en: {
          titulo: 'Available Books',
          subtitulo: 'Choose a book to access its analysis, summaries, and support materials.'
      }
  };
  
  const t = textos[idioma] || textos.pt;

  return (
    <section className="secaoLivros" aria-label={t.titulo}>
      <div className="tituloSecaoLivros">
        <h2>{t.titulo}</h2>
        <p>{t.subtitulo}</p>
      </div>

      <div className="gradeLivros">
        {livros.map((livro) => (
          <CartaoLivro key={livro.id} livro={livro} />
        ))}
      </div>
    </section>
  );
}