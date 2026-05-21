import CartaoIntegrante from './CartaoIntegrante.jsx';
import './GradeIntegrantes.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const textos = {
  pt: {
    tecnologia: { titulo: 'Equipe de Tecnologia', sub: 'Alunos de Desenvolvimento de Sistemas (SENAI)' },
    conteudo:   { titulo: 'Equipe de Conteúdo',   sub: 'Alunos de Mecânica e Eletro-eletrônica (SESI)' },
  },
  en: {
    tecnologia: { titulo: 'Technology Team', sub: 'Systems Development Students (SENAI)' },
    conteudo:   { titulo: 'Content Team',    sub: 'Mechanics and Electrical-Electronics Students (SESI)' },
  },
};

export default function GradeIntegrantes({ integrantes = [] }) {
  const { idioma } = useIdioma();
  const t = textos[idioma];

  const equipeConteudo = integrantes.filter(
    (i) => i.curso === 'Mecânica.' || i.curso === 'Eletro-eletrônica.',
  );

  const equipeTecnologia = integrantes.filter(
    (i) => i.curso !== 'Mecânica.' && i.curso !== 'Eletro-eletrônica.',
  );

  return (
    <>
      <section className="secaoIntegrantes">
        <div className="tituloSecaoIntegrantes">
          <div>
            <h2>{t.tecnologia.titulo}</h2>
            <p>{t.tecnologia.sub}</p>
          </div>
        </div>

        <div className="gradeIntegrantes">
          {equipeTecnologia.map((integrante) => (
            <CartaoIntegrante key={integrante.id} integrante={integrante} />
          ))}
        </div>
      </section>

      <section className="secaoIntegrantes">
        <div className="tituloSecaoIntegrantes">
          <div>
            <h2>{t.conteudo.titulo}</h2>
            <p>{t.conteudo.sub}</p>
          </div>
        </div>

        <div className="gradeIntegrantes">
          {equipeConteudo.map((integrante) => (
            <CartaoIntegrante key={integrante.id} integrante={integrante} />
          ))}
        </div>
      </section>
    </>
  );
}