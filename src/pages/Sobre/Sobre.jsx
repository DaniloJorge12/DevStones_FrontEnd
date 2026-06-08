import { useEffect, useState } from 'react';
import './Sobre.css';

import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import TopoSobre from '../../components/Sobre/TopoSobre.jsx';
import GradeIntegrantes from '../../components/Sobre/GradeIntegrantes.jsx';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const textos = {
    pt: {
        faqTitulo: 'Perguntas Frequentes (FAQ)',
        faqSubtitulo: 'Dúvidas sobre o funcionamento da plataforma DevStone e o Projeto Integrador.',
        faq: [
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
        ]
    },
    en: {
        faqTitulo: 'Frequently Asked Questions (FAQ)',
        faqSubtitulo: 'Questions about the operation of the DevStone platform and the Integrative Project.',
        faq: [
            {
                p: "What is the DevStone Platform?",
                r: "DevStone is an educational platform developed as part of the SENAI + SESI 2026 Integrative Project. Our mission is to offer free and interactive tools to help students prepare for college entrance exams, joining technology (programming) and in-depth literary analysis."
            },
            {
                p: "Why does the website only focus on \"Caminho das Pedras\"?",
                r: "We focus on the \"Caminho das Pedras\" project because it represents a structured learning path. Our goal is to guide students, step-by-step, through the most relevant literary works and programming concepts for current college entrance exams, ensuring a solid foundation before exploring new horizons."
            },
            {
                p: "How does the bilingual support (English) work?",
                r: "The DevStone Platform offers integrated bilingual support. This means that, in addition to the main content in Portuguese, students have access to support materials, vocabulary, and exercises in English, which are essential for language exams and the student's global development."
            },
            {
                p: "Do I need to pay to use the practice tests or download the exams?",
                r: "No, absolutely all resources on our platform, including interactive practice tests, literary analyses, and past exam downloads, are completely free and accessible to all students. Our commitment is to democratize access to quality education."
            }
        ]
    }
};

export default function Sobre({ usuario, aoSair }) {
    const { idioma } = useIdioma();
    const t = textos[idioma] || textos.pt;
    const [busca, setBusca] = useState('');
    const [listaIntegrantes, setListaIntegrantes] = useState([]);
    const [faqAberto, setFaqAberto] = useState(null);

    useEffect(() => {
        async function buscarIntegrantes() {
            try {
                const resposta = await fetch('https://devstones-backend.onrender.com/api/equipe', {
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
            <MenuLateral itemAtivo="Sobre nós" aoSair={aoSair} />

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
                            <h2 className="tituloFaq">{t.faqTitulo}</h2>
                            <p className="subtituloFaq">{t.faqSubtitulo}</p>

                            <div className="listaFaq">
                                {t.faq.map((item, index) => (
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
