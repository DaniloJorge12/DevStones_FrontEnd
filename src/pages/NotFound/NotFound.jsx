import React from 'react'
import './NotFound.css'

export default function NotFound() {
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
        <div className="badge">ERRO DE ROTA</div>
        <h1 className="title">Parece que você encontrou</h1>
        <h2 className="subtitle">uma pedra no caminho.</h2>

        <p className="description">A página que você está procurando não existe, foi movida ou você não tem permissão para acessá-la.</p>

        <div className="english-note">ENGLISH: It looks like you found a stone in your path. The page you are looking for does not exist, has been moved, or you don't have permission to access it.</div>

        <div className="actions">
          <button className="btn btn-primary" onClick={() => window.location.assign('/')}>Voltar ao Início</button>
          <a className="btn btn-outline" href="mailto:suporte@exemplo.com?subject=Reportar%20Erro%20de%20Rota">Reportar Erro</a>
        </div>
      </div>
    </div>
  )
}