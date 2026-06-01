import { FileText, Heart } from 'lucide-react';
import PlayerVideo from './PlayerVideo.jsx';
import './GradeVideoAulas.css';

function CartaoVideoAula({ aula }) {
    const ehPdf = aula.tipoMaterial === 'pdf';

    return (
        <article className="cartaoVideoAula">
            {ehPdf ? (
                <a
                    className="previewMaterialPdf"
                    href={aula.material}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Abrir ${aula.titulo}`}
                >
                    <FileText size={34} />
                    <span>PDF</span>
                </a>
            ) : (
                <PlayerVideo duracao={aula.duracao} titulo={aula.titulo} src={aula.material} />
            )}
            <h3>{aula.titulo}</h3>
            <p>{aula.descricao}</p>
        </article>
    );
}

export default function GradeVideoAulas({ aulas }) {
    return (
        <div className="gradeVideoAulas">
            {aulas.map((aula) => (
                <CartaoVideoAula key={aula.id} aula={aula} />
            ))}
        </div>
    );
}
