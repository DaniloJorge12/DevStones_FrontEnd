import { Heart } from 'lucide-react';
import PlayerVideo from './PlayerVideo.jsx';
import './AulaDestaque.css';

export default function AulaDestaque({ aula }) {
    return (
        <section className="aulaDestaque" aria-label="Aula em destaque">
            <div className="aulaDestaquePlayer">
                <PlayerVideo duracao={aula.duracao} titulo={aula.titulo} src={aula.material} />
            </div>

            <article className="cartaoAulaDestaque">
                <span className="seloAulaCompleta">{aula.tipo || 'Aula completa'}</span>
                <h2>{aula.titulo}</h2>
                <p>{aula.descricao}</p>

                <div className="dadosAulaDestaque">
                    <span>Livro #{aula.idDoLivro}</span>
                    <span>
                        <Heart size={13} />
                        {aula.curtidas} curtidas
                    </span>
                </div>
            </article>
        </section>
    );
}
