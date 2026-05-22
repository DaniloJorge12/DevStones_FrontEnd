import { useEffect, useState } from 'react';
import { BookOpen, Star, ArrowRight, X, ChevronRight } from 'lucide-react';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import { buscarSimulados, buscarLivros } from '../../services/simuladoService.js';
import './Simulados.css';

const textos = {
    pt: {
        titulo: 'Teste seus conhecimentos',
        subtitulo: 'Escolha uma obra e pratique com questões do vestibular.',
        desafioDia: 'DESAFIO DO DIA',
        quizDiarioTitulo: 'Quiz Diário: Literaturas Clássicas',
        quizDiarioDesc: 'Responda 10 questões aleatórias sobre os temas obrigatórios. Ganhe pontos e suba no ranking de turma!',
        comecar: 'Começar Quiz',
        explorar: 'Explorar por Obra Literária',
        explorarDesc: 'Selecione um livro para praticar com quizzes específicos sobre os seus capítulos e personagens.',
        buscarPlaceholder: 'Procurar livro...',
        temaCentral: 'TEMA CENTRAL',
        quizzesCount: (n) => `${n} Quizzes criados`,
        acessar: 'Acessar os Quizzes',
        carregando: 'Carregando...',
        semLivros: 'Nenhum livro encontrado.',
        fechar: 'Fechar',
        questao: 'Questão',
        de: 'de',
        proxima: 'Próxima',
        finalizar: 'Ver resultado',
        resultado: 'Quiz finalizado!',
        resultadoDesc: (acertos, total) => `Você acertou ${acertos} de ${total} questões.`,
        tentar: 'Tentar novamente',
        explicacao: 'Explicação',
    },
    en: {
        titulo: 'Test your knowledge',
        subtitulo: 'Choose a work and practice with entrance exam questions.',
        desafioDia: 'DAILY CHALLENGE',
        quizDiarioTitulo: 'Daily Quiz: Classic Literature',
        quizDiarioDesc: 'Answer 10 random questions on the required topics. Earn points and climb the class ranking!',
        comecar: 'Start Quiz',
        explorar: 'Explore by Literary Work',
        explorarDesc: 'Select a book to practice with specific quizzes about its chapters and characters.',
        buscarPlaceholder: 'Search book...',
        temaCentral: 'CENTRAL THEME',
        quizzesCount: (n) => `${n} Quizzes created`,
        acessar: 'Access Quizzes',
        carregando: 'Loading...',
        semLivros: 'No books found.',
        fechar: 'Close',
        questao: 'Question',
        de: 'of',
        proxima: 'Next',
        finalizar: 'See result',
        resultado: 'Quiz finished!',
        resultadoDesc: (acertos, total) => `You got ${acertos} out of ${total} questions right.`,
        tentar: 'Try again',
        explicacao: 'Explanation',
    },
};

function embaralhar(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

function montarQuestoes(simulados, idLivro, idioma) {
    const filtradas = simulados.filter((s) => s.idLivro === idLivro);
    return embaralhar(filtradas).map((s) => {
        const pergunta = idioma === 'en' ? (s.pergunta_en || s.pergunta) : s.pergunta;
        const correta = idioma === 'en' ? (s.respostaCorreta_en || s.respostaCorreta) : s.respostaCorreta;
        const erradas = idioma === 'en' ? (s.respostasErradas_en || s.respostasErradas) : s.respostasErradas;
        const explicacao = idioma === 'en' ? (s.explicacao_en || s.explicacao) : s.explicacao;
        return {
            id: s.id,
            pergunta,
            correta,
            opcoes: embaralhar([correta, ...erradas]),
            explicacao,
        };
    });
}

function ModalQuiz({ livro, questoes, aoFechar, t }) {
    const [indice, setIndice] = useState(0);
    const [selecionada, setSelecionada] = useState(null);
    const [acertos, setAcertos] = useState(0);
    const [finalizado, setFinalizado] = useState(false);

    const questao = questoes[indice];
    const total = questoes.length;
    const respondeu = selecionada !== null;

    function selecionar(opcao) {
        if (respondeu) return;
        setSelecionada(opcao);
        if (opcao === questao.correta) setAcertos((a) => a + 1);
    }

    function avancar() {
        if (indice + 1 >= total) {
            setFinalizado(true);
            return;
        }
        setIndice((i) => i + 1);
        setSelecionada(null);
    }

    function reiniciar() {
        setIndice(0);
        setSelecionada(null);
        setAcertos(0);
        setFinalizado(false);
    }

    return (
        <div className="overlayQuiz" onClick={(e) => e.target === e.currentTarget && aoFechar()}>
            <div className="modalQuiz">
                <div className="modalQuizTopo">
                    <div>
                        <h2>{livro.titulo}</h2>
                        <p>{livro.autor}</p>
                    </div>
                    <button className="botaoFecharModal" onClick={aoFechar} aria-label={t.fechar}>
                        <X size={16} />
                    </button>
                </div>

                {!finalizado ? (
                    <>
                        <div className="progressoQuiz">
                            <div className="progressoQuizInfo">
                                <span>{t.questao} {indice + 1} {t.de} {total}</span>
                                <span>{Math.round((indice / total) * 100)}%</span>
                            </div>
                            <div className="barraProgressoQuiz">
                                <div
                                    className="barraProgressoQuizPreenchida"
                                    style={{ width: `${(indice / total) * 100}%` }}
                                />
                            </div>
                        </div>

                        <p className="perguntaQuiz">{questao.pergunta}</p>

                        <div className="opcoesQuiz">
                            {questao.opcoes.map((opcao) => {
                                let classe = 'opcaoQuiz';
                                if (respondeu) {
                                    if (opcao === questao.correta) classe += ' opcaoCorreta';
                                    else if (opcao === selecionada) classe += ' opcaoErrada';
                                }
                                return (
                                    <button
                                        key={opcao}
                                        className={classe}
                                        onClick={() => selecionar(opcao)}
                                        disabled={respondeu}
                                    >
                                        {opcao}
                                    </button>
                                );
                            })}
                        </div>

                        {respondeu && questao.explicacao && (
                            <div className="explicacaoQuiz">
                                <strong>{t.explicacao}</strong>
                                {questao.explicacao}
                            </div>
                        )}

                        {respondeu && (
                            <button className="botaoProximaQuestao" onClick={avancar}>
                                {indice + 1 >= total ? t.finalizar : t.proxima}
                                <ChevronRight size={16} />
                            </button>
                        )}
                    </>
                ) : (
                    <div className="resultadoQuiz">
                        <div className="resultadoQuizIcone">
                            {acertos / total >= 0.7 ? '🎉' : acertos / total >= 0.4 ? '📚' : '💪'}
                        </div>
                        <h3>{t.resultado}</h3>
                        <div className="resultadoQuizPontos">{acertos}/{total}</div>
                        <p>{t.resultadoDesc(acertos, total)}</p>
                        <div className="botoesResultado">
                            <button className="botaoReiniciar" onClick={reiniciar}>{t.tentar}</button>
                            <button className="botaoProximaQuestao" onClick={aoFechar}>{t.fechar}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function CartaoLivro({ livro, quantidadeQuizzes, aoClicar, t }) {
    return (
        <div className="cartaoLivroSimulado">
            <div className="cartaoLivroTopo">
                <div className="cartaoLivroCapaWrap">
                    {livro.capa ? (
                        <img src={livro.capa} alt={livro.titulo} />
                    ) : (
                        <BookOpen size={18} className="cartaoLivroCapaIcone" />
                    )}
                </div>
                <div className="cartaoLivroInfo">
                    <h3>{livro.titulo}</h3>
                    <span>{livro.autor}</span>
                </div>
            </div>

            {livro.genero && <span className="badgeTema">{t.temaCentral}</span>}

            {livro.resumo && <p className="cartaoLivroResumo">{livro.resumo}</p>}

            <div className="cartaoLivroRodape">
                <span className="totalQuizzes">{t.quizzesCount(quantidadeQuizzes)}</span>
                <button className="botaoAcessarQuiz" onClick={aoClicar}>
                    {t.acessar} <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
}

export default function Simulados({ usuario, aoSair }) {
    const { idioma } = useIdioma();
    const t = textos[idioma] ?? textos.pt;

    const [livros, setLivros] = useState([]);
    const [simulados, setSimulados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [busca, setBusca] = useState('');
    const [livroAtivo, setLivroAtivo] = useState(null);
    const [questoesAtivas, setQuestoesAtivas] = useState([]);

    useEffect(() => {
        let ativo = true;

        async function carregar() {
            try {
                setCarregando(true);
                setErro('');
                const [dadosSimulados, dadosLivros] = await Promise.all([
                    buscarSimulados(),
                    buscarLivros(),
                ]);
                if (!ativo) return;
                const listaSimulados = Array.isArray(dadosSimulados) ? dadosSimulados : dadosSimulados?.data ?? [];
                const listaLivros = Array.isArray(dadosLivros) ? dadosLivros : dadosLivros?.data ?? [];
                setSimulados(listaSimulados);
                setLivros(listaLivros);
            } catch (e) {
                if (ativo) setErro(e.message);
            } finally {
                if (ativo) setCarregando(false);
            }
        }

        carregar();
        return () => { ativo = false; };
    }, []);

    const livrosFiltrados = livros.filter((l) => {
        const termo = busca.toLowerCase().trim();
        if (!termo) return true;
        return (
            l.titulo?.toLowerCase().includes(termo) ||
            l.autor?.toLowerCase().includes(termo) ||
            l.genero?.toLowerCase().includes(termo)
        );
    });

    function abrirQuiz(livro) {
        const questoes = montarQuestoes(simulados, livro.id, idioma);
        if (questoes.length === 0) return;
        setQuestoesAtivas(questoes);
        setLivroAtivo(livro);
    }

    function fecharQuiz() {
        setLivroAtivo(null);
        setQuestoesAtivas([]);
    }

    return (
        <div className="paginaSimulados">
            <MenuLateral itemAtivo="Simulados & Quiz" aoSair={aoSair} />

            <div className="conteudoSimulados">
                <Cabecalho usuario={usuario} aoSair={aoSair} />

                <main className="areaSimulados">
                    <div className="interiorSimulados">
                        <div className="topoSimulados">
                            <h1>{t.titulo}</h1>
                            <p>{t.subtitulo}</p>
                        </div>

                        <div className="quizDiario">
                            <div className="quizDiarioEsquerda">
                                <div className="quizDiarioIcone">
                                    <Star size={22} />
                                </div>
                                <div className="quizDiarioTexto">
                                    <span className="quizDiarioBadge">{t.desafioDia}</span>
                                    <h2>{t.quizDiarioTitulo}</h2>
                                    <p>{t.quizDiarioDesc}</p>
                                </div>
                            </div>
                            <button
                                className="botaoComecaQuiz"
                                onClick={() => {
                                    if (simulados.length > 0 && livros.length > 0) abrirQuiz(livros[0]);
                                }}
                            >
                                <ArrowRight size={15} />
                                {t.comecar}
                            </button>
                        </div>

                        <section className="secaoExplorar">
                            <div className="topoSecaoExplorar">
                                <div className="tituloSecaoExplorar">
                                    <div className="decorTitulo">
                                        <span className="linhaDecor" />
                                        <h2>{t.explorar}</h2>
                                    </div>
                                    <p>{t.explorarDesc}</p>
                                </div>
                                <div className="campoBuscaSimulados">
                                    <input
                                        type="text"
                                        placeholder={t.buscarPlaceholder}
                                        value={busca}
                                        onChange={(e) => setBusca(e.target.value)}
                                    />
                                </div>
                            </div>

                            {carregando ? (
                                <div className="estadoSimulados">{t.carregando}</div>
                            ) : erro ? (
                                <div className="estadoSimulados">{erro}</div>
                            ) : livrosFiltrados.length === 0 ? (
                                <div className="estadoSimulados">{t.semLivros}</div>
                            ) : (
                                <div className="gradeLivrosSimulados">
                                    {livrosFiltrados.map((livro) => {
                                        const qtd = simulados.filter((s) => s.idLivro === livro.id).length;
                                        return (
                                            <CartaoLivro
                                                key={livro.id}
                                                livro={livro}
                                                quantidadeQuizzes={qtd}
                                                aoClicar={() => abrirQuiz(livro)}
                                                t={t}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    </div>
                </main>

                <Rodape />
            </div>

            {livroAtivo && questoesAtivas.length > 0 && (
                <ModalQuiz
                    livro={livroAtivo}
                    questoes={questoesAtivas}
                    aoFechar={fecharQuiz}
                    t={t}
                />
            )}
        </div>
    );
}