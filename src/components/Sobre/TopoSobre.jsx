import './TopoSobre.css';

export default function TopoSobre({ totalIntegrantes, valorBusca, aoMudarBusca }) {
    return (
        <section className="topoSobre">
            <div className="textoTopoSobre">
                <span className="seloTopoSobre">SOBRE O PROJETO</span>
                <h1>Conectando tecnologia e literatura</h1>
                <p>
                    Uma colaboração única entre as disciplinas de Desenvolvimento de Sistemas
                    (SENAI) e Língua Portuguesa/Inglês (SESI) para criar a melhor ferramenta de
                    preparação para vestibulares.
                </p>
            </div>

            <label className="buscaSobre" htmlFor="busca-integrantes">
                <Search size={18} />
                <input
                    id="busca-integrantes"
                    type="search"
                    value={valorBusca}
                    onChange={aoMudarBusca}
                    placeholder="Buscar integrante, autor ou tema"
                />
                <span className="contadorSobre">{totalIntegrantes} integrantes</span>
            </label>
        </section>
    );
}
