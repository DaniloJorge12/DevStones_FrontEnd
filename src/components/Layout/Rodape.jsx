import './Rodape.css';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const textos = {
  pt: { copy: '© 2026 Projeto Integrador SENAI + SESI', fe: 'Github do FrontEnd', be: 'Github do BackEnd' },
  en: { copy: '© 2026 SENAI + SESI Integrative Project', fe: 'Frontend Github',    be: 'Backend Github'   },
};

export default function Rodape() {
  const { idioma } = useIdioma();
  const t = textos[idioma];

  return (
    <footer className="rodape">
      <p>{t.copy}</p>

      <div className="linksRodape">
        <a href="https://github.com/DaniloJorge12/DevStones_FrontEnd.git">{t.fe}</a>
        <a href="https://github.com/Fabiox7778/ClubeLivro_BackEnd.git">{t.be}</a>
      </div>
    </footer>
  );
}