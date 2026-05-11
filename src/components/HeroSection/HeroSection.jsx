import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="heroSection">
      <div className="heroFundo" aria-hidden="true" />

      <div className="heroTexto">
        <span className="seloHero">Plataforma de Estudos</span>
        <h1>A sua jornada literária para o vestibular começa aqui.</h1>
        <p>
          O DevStone une tecnologia e literatura para oferecer resumos
          aprofundados, simulados interativos e uma comunidade de estudantes
          focados no mesmo objetivo que você.
        </p>
      </div>

      <div className="heroImagem">
        <img
          src="/src/assets/img/grupo.png"
          alt="Estudantes em ambiente de estudo"
        />
      </div>
    </section>
  );
}
