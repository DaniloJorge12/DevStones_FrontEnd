import CartaoIntegrante from './CartaoIntegrante.jsx';
import './GradeIntegrantes.css';

export default function GradeIntegrantes({ integrante }) {
  return (
    <section className="secaoIntegrantes" aria-label="Integrantes">
      <div className="tituloSecaoIntegrantes">
        <h2>Integrantes do projeto</h2>
        <p>Veja quem fez nosso sonho acontecer</p>
      </div>

      <div className="gradeIntegrantes">
        {integrante.map((integrante) => (
          <CartaoIntegrante key={integrante.id} integrante={integrante} />
        ))}
      </div>
    </section>
  );
}
