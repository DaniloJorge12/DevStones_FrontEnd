import './CartaoPersonagem.css';

export default function CartaoPersonagem({ nome, descricao }) {
  const inicial = nome?.[0]?.toUpperCase() ?? '?';

  return (
    <article className="cartaoPersonagem">
      <div className="cartaoPersonagem__avatar" aria-hidden="true">
        {inicial}
      </div>

      <div className="cartaoPersonagem__corpo">
        <h4 className="cartaoPersonagem__nome">{nome ?? 'Sem nome'}</h4>
        <p className="cartaoPersonagem__descricao">{descricao ?? 'Sem descrição'}</p>
      </div>
    </article>
  );
}