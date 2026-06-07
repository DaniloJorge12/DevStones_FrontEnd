import { useEffect, useRef, useState } from 'react';
import { BookOpen, Star, ArrowRight, X, ChevronRight, Sparkles, Loader2, Trash2 } from 'lucide-react';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';
import { buscarSimulados, buscarLivros, gerarQuestoesIA } from '../../services/simuladoService.js';
import './Simulados.css';

const CHAVE_QUIZZES_IA = 'devstones_quizzes_ia';

const VIDEOS_LOADING = [
   'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/ivonete3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9pdm9uZXRlMy5tcDQiLCJpYXQiOjE3ODAzNTU5OTUsImV4cCI6MTgxMTg5MTk5NX0.4tghyAiZyj_4w5MuIjSw2hPq79pkaVe_sn_1SFESUlU',
   'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/mamprim.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9tYW1wcmltLm1wNCIsImlhdCI6MTc4MDM1NjUzNSwiZXhwIjoxODExODkyNTM1fQ.GaKtMxmiRdY6OzCIyyODH3cYV-RDpz_7I8zwxJQ4clg',
   'https://xjdxuxqhnhqilczirhlj.supabase.co/storage/v1/object/sign/arquivos/daniela2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yZmM4YzEwNC1iMjE3LTQ4ZDMtOWMyMi0zMzE4MTdjYzhkMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnF1aXZvcy9kYW5pZWxhMi5tcDQiLCJpYXQiOjE3ODAzNTY1NjYsImV4cCI6MTgxMTg5MjU2Nn0.W4K49XxvxhuWCcbhMh9o9512CCp1JG8Al53VWoe7OLY'
];

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
        iaTitulo: 'Gerar Quiz com a NoemIA',
        iaDesc: 'Digite qualquer tema literário ou de vestibular e a NoemIA cria um quiz exclusivo para você na hora.',
        iaBadge: 'POWERED BY NOEMIA',
        iaPlaceholder: 'Ex: Dom Casmurro, Romantismo, Realismo Brasileiro...',
        iaQtd: 'Quantas questões?',
        iaGerar: 'Gerar Quiz',
        iaGerandoTitulo: 'A NoemIA está criando seu quiz...',
        iaGerandoDesc: 'Isso pode levar até 30 segundos. Aguenta aí!',
        iaErro: 'Não foi possível gerar o quiz. Tente novamente.',
        quizPronto: 'SEU QUIZ ESTÁ PRONTO',
        salvosSecao: 'Quizzes gerados por você',
        salvosDesc: 'Os quizzes que a NoemIA criou ficam aqui para você refazer quando quiser.',
        salvosQuestoes: (n) => `${n} questões`,
        salvosRefazer: 'Refazer',
        salvosVazio: 'Nenhum quiz salvo ainda. Gere um acima!',
        geradoPorIA: 'GERADO POR NOEMIA',
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
        iaTitulo: 'Generate Quiz with NoemAI',
        iaDesc: 'Type any literary or exam topic and NoemAI creates an exclusive quiz for you on the spot.',
        iaBadge: 'POWERED BY NOEMAI',
        iaPlaceholder: 'Ex: Dom Casmurro, Romanticism, Brazilian Realism...',
        iaQtd: 'How many questions?',
        iaGerar: 'Generate Quiz',
        iaGerandoTitulo: 'NoemAI is creating your quiz...',
        iaGerandoDesc: 'This can take up to 30 seconds. Hang tight!',
        iaErro: 'Could not generate quiz. Please try again.',
        quizPronto: 'YOUR QUIZ IS READY',
        salvosSecao: 'Quizzes you generated',
        salvosDesc: 'The quizzes NoemAI created stay here for you to redo whenever you want.',
        salvosQuestoes: (n) => `${n} questions`,
        salvosRefazer: 'Redo',
        salvosVazio: 'No saved quizzes yet. Generate one above!',
        geradoPorIA: 'GENERATED BY NOEMAI',
    },
};

function lerQuizzesSalvos() {
    try {
        const raw = localStorage.getItem(CHAVE_QUIZZES_IA);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function salvarQuizNoStorage(livro, questoes) {
    try {
        const existentes = lerQuizzesSalvos();
        const novo = {
            id: Date.now(),
            criadoEm: new Date().toISOString(),
            livro,
            questoes,
        };
        const atualizados = [novo, ...existentes].slice(0, 20);
        localStorage.setItem(CHAVE_QUIZZES_IA, JSON.stringify(atualizados));
        return atualizados;
    } catch {
        return lerQuizzesSalvos();
    }
}

function removerQuizDoStorage(id) {
    try {
        const existentes = lerQuizzesSalvos();
        const filtrados = existentes.filter((q) => q.id !== id);
        localStorage.setItem(CHAVE_QUIZZES_IA, JSON.stringify(filtrados));
        return filtrados;
    } catch {
        return lerQuizzesSalvos();
    }
}

function embaralhar(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

function montarQuestoes(simulados, idLivro, idioma) {
    const filtradas = simulados.filter((s) => String(s.idLivro) === String(idLivro));
    return embaralhar(filtradas).map((s) => {
        const pergunta  = idioma === 'en' ? (s.pergunta_en  || s.pergunta)  : s.pergunta;
        const correta   = idioma === 'en' ? (s.respostaCorreta_en || s.respostaCorreta) : s.respostaCorreta;
        const erradas   = idioma === 'en' ? (s.respostasErradas_en || s.respostasErradas) : s.respostasErradas;
        const explicacao= idioma === 'en' ? (s.explicacao_en || s.explicacao) : s.explicacao;
        return {
            id: s.id,
            pergunta,
            correta,
            opcoes: embaralhar([correta, ...erradas]),
            explicacao,
        };
    });
}

function montarQuestoesIA(questoes, idioma) {
    return questoes.map((q) => {
        const pergunta  = idioma === 'en' ? (q.pergunta_en  || q.pergunta)  : q.pergunta;
        const correta   = idioma === 'en' ? (q.respostaCorreta_en || q.respostaCorreta) : q.respostaCorreta;
        const erradas   = idioma === 'en' ? (q.respostasErradas_en || q.respostasErradas) : q.respostasErradas;
        const explicacao= idioma === 'en' ? (q.explicacao_en || q.explicacao) : q.explicacao;
        return {
            id: Math.random(),
            pergunta,
            correta,
            opcoes: embaralhar([correta, ...erradas]),
            explicacao,
        };
    });
}

function formatarData(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function TelaGerandoIA({ t }) {
    const [indice, setIndice] = useState(() =>
        Math.floor(Math.random() * VIDEOS_LOADING.length)
    );

    function sortearProximo() {
        setIndice((atual) => {
            if (VIDEOS_LOADING.length <= 1) return atual;
            let novo;
            do {
                novo = Math.floor(Math.random() * VIDEOS_LOADING.length);
            } while (novo === atual);
            return novo;
        });
    }

    return (
        <div className="telaGerandoIA">
            <div className="telaGerandoIAVideo">
                <video
                    key={indice}
                    src={VIDEOS_LOADING[indice]}
                    autoPlay
                    muted
                    playsInline
                    onEnded={sortearProximo}
                />
            </div>
            <div className="telaGerandoIATexto">
                <Loader2 size={22} className="iconeSpin" />
                <h3>{t.iaGerandoTitulo}</h3>
                <p>{t.iaGerandoDesc}</p>
            </div>
        </div>
    );
}

function TelaQuizPronto({ t }) {
    return (
        <div className="telaQuizPronto">
            <span className="telaQuizProntoEmoji">🎉</span>
            <h2>{t.quizPronto}</h2>
        </div>
    );
}

function SecaoGerarIA({ t, idioma, onGerandoMudou, onQuestoesGeradas }) {
    const [tema, setTema]       = useState('');
    const [qtd, setQtd]         = useState(5);
    const [gerando, setGerando] = useState(false);
    const [erro, setErro]       = useState('');

    async function handleGerar() {
        const temaLimpo = tema.trim();
        if (!temaLimpo) return;
        setErro('');
        setGerando(true);
        onGerandoMudou(true);
        try {
            const resultado = await gerarQuestoesIA(temaLimpo, qtd);
            const listaQuestoes = resultado?.objetoGerado?.questoes;
            if (!Array.isArray(listaQuestoes) || listaQuestoes.length === 0) {
                throw new Error('O servidor retornou uma resposta inválida. Tente novamente.');
            }
            const questoes = montarQuestoesIA(listaQuestoes, idioma);
            onQuestoesGeradas(
                { titulo: temaLimpo, autor: 'Gerado por IA' },
                questoes
            );
        } catch (e) {
            setErro(e.message || t.iaErro);
            setGerando(false);
            onGerandoMudou(false);
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') handleGerar();
    }

    return (
        <div className="secaoGerarIA">
            <div className="gerarIAGrade" aria-hidden="true" />
            <div className="gerarIACirculo" aria-hidden="true" />

            <div className="gerarIAConteudo">
                <div className="gerarIACabecalho">
                    <span className="gerarIABadge">
                        <Sparkles size={11} />
                        {t.iaBadge}
                    </span>
                    <h2>{t.iaTitulo}</h2>
                    <p>{t.iaDesc}</p>
                </div>

                <div className="gerarIAControles">
                    <div className="gerarIALinha">
                        <input
                            type="text"
                            className="gerarIAInput"
                            placeholder={t.iaPlaceholder}
                            value={tema}
                            onChange={(e) => setTema(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={gerando}
                        />
                        <button
                            className="gerarIABotao"
                            onClick={handleGerar}
                            disabled={gerando || !tema.trim()}
                        >
                            {gerando ? (
                                <Loader2 size={15} className="iconeSpin" />
                            ) : (
                                <Sparkles size={15} />
                            )}
                            {t.iaGerar}
                        </button>
                    </div>

                    <div className="gerarIASelectWrap">
                        <label className="gerarIALabel">{t.iaQtd}</label>
                        <select
                            className="gerarIASelect"
                            value={qtd}
                            onChange={(e) => setQtd(Number(e.target.value))}
                            disabled={gerando}
                        >
                            {[3, 5, 7, 10].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {erro && <p className="gerarIAErro">{erro}</p>}
            </div>
        </div>
    );
}

function SecaoQuizzesSalvos({ t, quizzesSalvos, aoAbrirQuiz, aoRemover }) {
    if (quizzesSalvos.length === 0) return null;

    return (
        <section className="secaoQuizzesSalvos">
            <div className="topoSecaoExplorar" style={{ marginBottom: 20 }}>
                <div className="tituloSecaoExplorar">
                    <div className="decorTitulo">
                        <span className="linhaDecor" />
                        <h2>{t.salvosSecao}</h2>
                    </div>
                    <p>{t.salvosDesc}</p>
                </div>
            </div>

            <div className="gradeLivrosSimulados">
                {quizzesSalvos.map((item) => (
                    <div key={item.id} className="cartaoLivroSimulado cartaoQuizSalvo">
                        <div className="cartaoLivroTopo">
                            <div className="cartaoLivroCapaWrap cartaoQuizSalvoIcone">
                                <Sparkles size={16} />
                            </div>
                            <div className="cartaoLivroInfo">
                                <h3>{item.livro.titulo}</h3>
                                <span>{formatarData(item.criadoEm)}</span>
                            </div>
                        </div>

                        <span className="badgeIA">{t.geradoPorIA}</span>

                        <div className="cartaoLivroRodape">
                            <span className="totalQuizzes">{t.salvosQuestoes(item.questoes.length)}</span>
                            <div className="botoesCartaoSalvo">
                                <button
                                    className="botaoRemoverSalvo"
                                    onClick={() => aoRemover(item.id)}
                                    aria-label="Remover quiz"
                                >
                                    <Trash2 size={14} />
                                </button>
                                <button
                                    className="botaoAcessarQuiz"
                                    onClick={() => aoAbrirQuiz(item.livro, item.questoes)}
                                >
                                    {t.salvosRefazer} <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ModalQuiz({ livro, questoes, aoFechar, t }) {
    const [indice,    setIndice]    = useState(0);
    const [selecionada, setSelecionada] = useState(null);
    const [acertos,   setAcertos]   = useState(0);
    const [finalizado, setFinalizado] = useState(false);

    const questao  = questoes[indice];
    const total    = questoes.length;
    const respondeu = selecionada !== null;

    function selecionar(opcao) {
        if (respondeu) return;
        setSelecionada(opcao);
        if (opcao === questao.correta) setAcertos((a) => a + 1);
    }

    function avancar() {
        if (indice + 1 >= total) { setFinalizado(true); return; }
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

    const [livros, setLivros]      = useState([]);
    const [simulados, setSimulados]   = useState([]);
    const [carregando, setCarregando]  = useState(true);
    const [erro, setErro]        = useState('');
    const [busca, setBusca]       = useState('');
    const [livroAtivo, setLivroAtivo]  = useState(null);
    const [questoesAtivas, setQuestoesAtivas] = useState([]);

    const [gerandoIA, setGerandoIA]   = useState(false);
    const [prontoIA, setProntoIA]    = useState(false);
    const [livroIAPendente, setLivroIAPendente]    = useState(null);
    const [questoesIAPendentes, setQuestoesIAPendentes] = useState([]);
    const [quizzesSalvos, setQuizzesSalvos] = useState(() => lerQuizzesSalvos());

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
                const listaLivros    = Array.isArray(dadosLivros)    ? dadosLivros    : dadosLivros?.data    ?? [];
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
            l.autor?.toLowerCase().includes(termo)  ||
            l.genero?.toLowerCase().includes(termo)
        );
    });

    function abrirQuiz(livro) {
        const questoes = montarQuestoes(simulados, livro.id, idioma);
        if (questoes.length === 0) return;
        setQuestoesAtivas(questoes);
        setLivroAtivo(livro);
    }

    function abrirQuizSalvo(livro, questoes) {
        const reembaralhadas = questoes.map((q) => ({
            ...q,
            id: Math.random(),
            opcoes: embaralhar(q.opcoes),
        }));
        setQuestoesAtivas(reembaralhadas);
        setLivroAtivo(livro);
    }

    function aoQuestoesIAGeradas(livro, questoes) {
        const salvos = salvarQuizNoStorage(livro, questoes);
        setQuizzesSalvos(salvos);
        setLivroIAPendente(livro);
        setQuestoesIAPendentes(questoes);
        setGerandoIA(false);
        setProntoIA(true);
        setTimeout(() => {
            setProntoIA(false);
            setQuestoesAtivas(questoes);
            setLivroAtivo(livro);
            setLivroIAPendente(null);
            setQuestoesIAPendentes([]);
        }, 3000);
    }

    function aoRemoverSalvo(id) {
        const atualizados = removerQuizDoStorage(id);
        setQuizzesSalvos(atualizados);
    }

    function fecharQuiz() {
        setLivroAtivo(null);
        setQuestoesAtivas([]);
    }

    const mostrando = gerandoIA || prontoIA;

    return (
        <div className="paginaSimulados">
            <MenuLateral itemAtivo="Simulados & Quiz" aoSair={aoSair} />

            <div className="conteudoSimulados">
                <Cabecalho usuario={usuario} aoSair={aoSair} />

                <main className="areaSimulados">
                    {mostrando ? (
                        <div className="areaGerandoIA">
                            {gerandoIA && <TelaGerandoIA t={t} />}
                            {prontoIA  && <TelaQuizPronto t={t} />}
                        </div>
                    ) : (
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

                            <SecaoGerarIA
                                t={t}
                                idioma={idioma}
                                onGerandoMudou={setGerandoIA}
                                onQuestoesGeradas={aoQuestoesIAGeradas}
                            />

                            <SecaoQuizzesSalvos
                                t={t}
                                quizzesSalvos={quizzesSalvos}
                                aoAbrirQuiz={abrirQuizSalvo}
                                aoRemover={aoRemoverSalvo}
                            />

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
                                            const qtd = simulados.filter((s) => String(s.idLivro) === String(livro.id)).length;
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
                    )}
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
