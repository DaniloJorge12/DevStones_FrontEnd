import { Play } from 'lucide-react';
import './PlayerVideo.css';

export default function PlayerVideo({ duracao, titulo, src }) {
    if (src) {
        return (
            <div className="playerVideo playerVideoComMidia">
                <video controls preload="metadata" aria-label={titulo}>
                    <source src={src} type="video/mp4" />
                </video>
            </div>
        );
    }

    return (
        <button className="playerVideo" type="button" aria-label={`Assistir ${titulo}`}>
            <span className="botaoPlayVideo">
                <Play size={28} fill="currentColor" />
            </span>
            {duracao ? <span className="duracaoPlayer">{duracao}</span> : null}
        </button>
    );
}
