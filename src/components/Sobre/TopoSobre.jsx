import { Code2, BookOpen, Languages } from 'lucide-react';

import './TopoSobre.css';

export default function TopoSobre() {
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

            <div className="cardsProjeto">
                <article className="cardProjeto">
                    <div className="iconeProjeto vermelho">
                        <Code2 size={22} />
                    </div>

                    <h3>Backend & API</h3>

                    <p>
                        Infraestrutura robusta desenvolvida em Node.js e PostgreSQL pelos alunos do
                        SENAI. Nossa API REST fornece dados em tempo real para toda a plataforma.
                    </p>
                </article>

                <article className="cardProjeto">
                    <div className="iconeProjeto azul">
                        <BookOpen size={22} />
                    </div>

                    <h3>Conteúdo Literário</h3>

                    <p>
                        Resumos, análises e simulados desenvolvidos pelos alunos do SESI, focando em
                        preparação para vestibulares.
                    </p>
                </article>

                <article className="cardProjeto">
                    <div className="iconeProjeto verde">
                        <Languages size={22} />
                    </div>

                    <h3>Imersão Bilíngue</h3>

                    <p>
                        Plataforma 100% adaptada para Inglês com foco em acessibilidade e
                        interpretação do conteúdo.
                    </p>
                </article>
            </div>
        </section>
    );
}
