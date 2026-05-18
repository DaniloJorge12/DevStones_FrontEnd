import CartaoIntegrante from './CartaoIntegrante.jsx';
import './GradeIntegrantes.css';

export default function GradeIntegrantes({ integrantes = [] }) {
    const equipeConteudo = integrantes.filter(
        (integrante) =>
            integrante.curso === 'Mecânica.' || integrante.curso === 'Eletro-eletrônica.',
    );

    const equipeTecnologia = integrantes.filter(
        (integrante) =>
            integrante.curso !== 'Mecânica.' && integrante.curso !== 'Eletro-eletrônica.',
    );

    return (
        <>
            <section className="secaoIntegrantes">
                <div className="tituloSecaoIntegrantes">
                    <div>
                        <h2>Equipe de Tecnologia</h2>

                        <p>Alunos de Desenvolvimento de Sistemas (SENAI)</p>
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
                        <h2>Equipe de Conteúdo</h2>

                        <p>Alunos de Mecânica e Eletro-eletrônica (SESI)</p>
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
