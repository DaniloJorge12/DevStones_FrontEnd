import { useEffect, useState } from 'react';
import './Sobre.css';

import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import TopoSobre from '../../components/Sobre/TopoSobre.jsx';
import GradeIntegrantes from '../../components/Sobre/GradeIntegrantes.jsx';

export default function Sobre({ usuario, aoSair }) {
    const [busca, setBusca] = useState('');
    const [listaIntegrantes, setListaIntegrantes] = useState([]);
    const [faqAberto, setFaqAberto] = useState(null);

useEffect(() => {
    async function buscarIntegrantes() {
        try {
            const resposta = await fetch('https://devstones-backend.onrender.com/api/equipe', {
                //Quando postarmos no Vercel, tem que alterar para 'https://clubelivro-backend-zui4.onrender.com/api/equipe'
                method: 'GET',
                headers: {
                    'x-api-key': 'livr0',
                },
            });

            if (!resposta.ok) {
                throw new Error('Erro ao buscar integrantes');
            }

            const dados = await resposta.json();

            setListaIntegrantes(dados);
        } catch (erro) {
            console.error('Erro ao buscar integrantes:', erro);
        }
    }

    buscarIntegrantes();
}, []);

    const integrantesFiltrados = listaIntegrantes.filter((integrante) =>
        integrante.nome?.toLowerCase().includes(busca.toLowerCase()),
    );

    return (
        <div className="paginaSobre">
            <MenuLateral itemAtivo="Sobre" aoSair={aoSair} />

            <div className="conteudoSobre">
                <Cabecalho usuario={usuario} aoSair={aoSair} />

                <main className="areaSobre">
                    <div className="conteudoSobreInterno">
                        <TopoSobre
                            totalIntegrantes={listaIntegrantes.length}
                            valorBusca={busca}
                            aoMudarBusca={(e) => setBusca(e.target.value)}
                        />

                        <GradeIntegrantes integrantes={integrantesFiltrados} />

                        <section className="secaoFaq">
                            <h2 className="tituloFaq">Perguntas Frequentes (FAQ)</h2>
                            <p className="subtituloFaq">Dúvidas sobre o funcionamento da plataforma DevStone e o Projeto Integrador.</p>

                            <div className="listaFaq">
                                {[
                                    {
                                        p: "O que é a Plataforma DevStone?",
                                        r: "A DevStone é uma plataforma educacional desenvolvida como parte do Projeto Integrador SENAI + SESI 2026. Nossa missão é oferecer ferramentas gratuitas e interativas para ajudar estudantes a se prepararem para o vestibular, unindo tecnologia (programação) e análise literária profunda."
                                    },
                                    {
                                        p: "Por que o site aborda apenas \"Caminho das Pedras\"?",
                                        r: "Focamos no projeto \"Caminho das Pedras\" pois ele representa um itinerário de aprendizado estruturado. Nosso objetivo é guiar o estudante, passo a passo, pelas obras literárias e conceitos de programação mais relevantes para os vestibulares atuais, garantindo uma base sólida antes de explorar novos horizontes."
                                    },
                                    {
                                        p: "Como funciona o suporte bilingue (Inglês)?",
                                        r: "A Plataforma DevStone oferece suporte bilíngue integrado. Isso significa que, além do conteúdo principal em português, os alunos têm acesso a materiais de apoio, vocabulário e exercícios em inglês, essenciais para as provas de línguas e para o desenvolvimento global do estudante."
                                    },
                                    {
                                        p: "Preciso pagar para usar os simulados ou baixar as provas?",
                                        r: "Não, absolutamente todos os recursos da nossa plataforma, incluindo simulados interativos, análises de obras literárias e o download de provas passadas, são totalmente gratuitos e acessíveis para todos os estudantes. Nosso compromisso é com a democratização do acesso à educação de qualidade."
                                    }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`itemFaq ${faqAberto === index ? 'aberto' : ''}`}
                                    >
                                        <button className="botaoFaq" onClick={() => setFaqAberto(faqAberto === index ? null : index)}>
                                            <span>{item.p}</span>
                                            <span className="iconeFaq">
                                                {faqAberto === index ? '✕' : '＋'}
                                            </span>
                                        </button>

                                        <div className="respostaFaq">
                                            <p>{item.r}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>

                <Rodape />
            </div>
        </div>
    );
}
