import React from 'react'
import './NotFound.css'
import { useIdioma } from '../../contexts/IdiomaContext.jsx'

const textos = {
  pt: {
    badge: 'ERRO DE ROTA',
    titulo: 'Parece que você encontrou',
    subtitulo: 'uma pedra no caminho.',
    descricao: 'A página que você está procurando não existe, foi movida ou você não tem permissão para acessá-la.',
    voltar: 'Voltar ao Início',
    reportar: 'Reportar Erro',
  },
  en: {
    badge: 'ROUTE ERROR',
    titulo: 'It looks like you found',
    subtitulo: 'a stone in your path.',
    descricao: 'The page you are looking for does not exist, has been moved, or you do not have permission to access it.',
    voltar: 'Back to Home',
    reportar: 'Report Error',
  },
};

export default function NotFound() {
  const { idioma } = useIdioma();
  const t = textos[idioma];

  return (
    <div className="notfound-page">
      <div className="notfound-404">
        <span className="num">4</span>
        <svg className="hex" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <polygon points="50,10 80,25 80,60 50,80 20,60 20,25" fill="#111" />
        </svg>
        <span className="num">4</span>
      </div>

      <div className="notfound-card">
        <div className="badge">{t.badge}</div>
        <h1 className="title">{t.titulo}</h1>
        <h2 className="subtitle">{t.subtitulo}</h2>
        <p className="description">{t.descricao}</p>

        <div className="actions">
          <button className="btn btn-primary" onClick={() => window.location.assign('/')}>{t.voltar}</button>
          <a className="btn btn-outline" href="mailto:suporte@exemplo.com?subject=Reportar%20Erro%20de%20Rota">{t.reportar}</a>
        </div>
      </div>
    </div>
  )
}