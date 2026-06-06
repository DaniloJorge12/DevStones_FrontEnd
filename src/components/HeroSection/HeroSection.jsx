import "./HeroSection.css";
import { useIdioma } from "../../contexts/IdiomaContext.jsx";

const textos = {
  pt: {
    selo: "Plataforma de Estudos",
    titulo: "A sua jornada literária para o vestibular começa aqui.",
    descricao:
      "O DevStone une tecnologia e literatura para oferecer resumos aprofundados, simulados interativos e uma comunidade de estudantes focados no mesmo objetivo que você.",
    botao: "Começar Jornada"
  },
  en: {
    selo: "Study Platform",
    titulo: "Your literary journey for the college entrance exam starts here.",
    descricao:
      "DevStone brings together technology and literature to offer in-depth summaries, interactive practice tests, and a community of students focused on the same goal as you.",
    botao: "Start Journey"
  },
};

export default function HeroSection() {
  const { idioma } = useIdioma();
  const t = textos[idioma];

  function navegarPara(rota) {
    window.history.pushState({}, '', rota);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  return (
      <section className="heroSection">
          <div className="heroFundo" aria-hidden="true" />

          <div className="heroTexto">
              <span className="seloHero">{t.selo}</span>
              <h1>{t.titulo}</h1>
              <p>{t.descricao}</p>
              
              <div className="heroAcoes" style={{ marginTop: '2rem' }}>
                <button 
                  className="botaoHero" 
                  onClick={() => navegarPara('/biblioteca')}
                  style={{ 
                    padding: '0.8rem 1.5rem', 
                    borderRadius: '8px', 
                    border: 'none', 
                    background: 'var(--cor-primaria)', 
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {t.botao}
                </button>
              </div>
          </div>

          <div className="heroImagem">
              <img
                  src="https://github.com/DaniloJorge12/DevStones_FrontEnd/blob/main/src/assets/img/grupo.png?raw=true"
                  alt={
                      idioma === 'pt'
                          ? 'Estudantes em ambiente de estudo'
                          : 'Students in a study environment'
                  }
              />
          </div>
      </section>
  );
}
