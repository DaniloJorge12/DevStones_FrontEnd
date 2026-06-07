import { useEffect, useState } from 'react';
import './LivroPrincipal.css';

import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import CartaoPersonagem from '../../components/LivroPrincipal/CartaoPersonagem.jsx';
import { useIdioma } from '../../contexts/IdiomaContext.jsx';

const API_BASE = 'https://devstones-backend.onrender.com/api';
const API_KEY  = 'livr0';
const ID_LIVRO_CAMINHO_PEDRAS = 1;

const ui = {
  pt: {
    carregando: 'Carregando...',
    erro: 'Erro ao carregar o livro. Verifique o console (F12).',
    subtitulo: '"Uma história de gente magra, de fome e de lutas invisíveis."',
    publicadoEm: (ano, autor) => `Publicado em ${ano}, ${autor} apresenta uma narrativa marcada por conflitos sociais, tensões políticas e a organização da classe trabalhadora no Brasil dos anos 30.`,
    resumo: 'Resumo da Obra',
    analise: 'Análise Crítica',
    personagens: 'Personagens Principais',
    personagensSubtitulo: 'As peças fundamentais desta saga política e emocional',
    semPersonagens: 'Nenhum personagem encontrado.',
    contextoTitulo: 'O Brasil de 1937',
  },
  en: {
    carregando: 'Loading...',
    erro: 'Error loading the book. Check the console (F12).',
    subtitulo: '"A story of thin people, of hunger and invisible struggles."',
    publicadoEm: (ano, autor) => `Published in ${ano}, ${autor} presents a narrative marked by social conflicts, political tensions, and the organization of the working class in 1930s Brazil.`,
    resumo: 'Work Summary',
    analise: 'Critical Analysis',
    personagens: 'Main Characters',
    personagensSubtitulo: 'The key pieces of this political and emotional saga',
    semPersonagens: 'No characters found.',
    contextoTitulo: 'Brazil in 1937',
  },
};

export default function LivroPrincipal({ usuario, aoSair }) {
  const [livro, setLivro] = useState(null);
  const [erro, setErro] = useState(false);
  const { idioma } = useIdioma();
  const t = ui[idioma];
  const en = idioma === 'en';

  useEffect(() => {
    async function carregarLivro() {
      try {
        const headers = {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        };

        const [livroRes, personagensRes] = await Promise.all([
          fetch(`${API_BASE}/livro`, { method: 'GET', headers }),
          fetch(`${API_BASE}/personagem`, { method: 'GET', headers }),
        ]);

        if (!livroRes.ok || !personagensRes.ok) {
          throw new Error(`HTTP error: livro=${livroRes.status} personagens=${personagensRes.status}`);
        }

        const livrosAPI = await livroRes.json();
        const personagensAPI = await personagensRes.json();

        const lista = Array.isArray(livrosAPI) ? livrosAPI : [livrosAPI];
        const livroAPI = lista.find((l) => Number(l.id) === ID_LIVRO_CAMINHO_PEDRAS) ?? lista[0];

        if (!livroAPI) throw new Error('Livro não encontrado na API');

        const personagensLivro = Array.isArray(personagensAPI)
          ? personagensAPI
              .filter((p) => {
                const idRef = p.idLivro ?? p.livroId ?? p.livro_id ?? p.id_livro;
                return Number(idRef) === Number(livroAPI.id);
              })
              .map((p) => ({
                nome:        p.nome        ?? 'Sem nome',
                descricao:   p.descricao   ?? 'Sem descrição',
                descricao_en: p.descricao_en ?? p.descricao ?? 'No description',
                importancia:  p.importancia  ?? '',
                importancia_en: p.importancia_en ?? p.importancia ?? '',
              }))
          : [];

        setLivro({
          titulo:   livroAPI.titulo   ?? 'Sem título',
          autor:    livroAPI.autor    ?? 'Autor desconhecido',
          ano:      livroAPI.anoPublicacao ?? '---',
          genero:   livroAPI.genero   ?? '',
          resumo:   livroAPI.resumo   ?? 'Sem resumo',
          resumo_en: livroAPI.resumo_en ?? livroAPI.resumo ?? 'No summary',
          analise:  livroAPI.caracteristicasLiterarias    ?? 'Sem análise',
          analise_en: livroAPI.caracteristicasLiterarias_en ?? livroAPI.caracteristicasLiterarias ?? 'No analysis',
          contexto: livroAPI.contexto  ?? 'Sem contexto',
          contexto_en: livroAPI.contexto_en ?? livroAPI.contexto ?? 'No context',
          personagens: personagensLivro,
          capa: livroAPI.capa ?? '',
        });
      } catch (e) {
        console.error('Erro ao carregar livro:', e);
        setErro(true);
      }
    }

    carregarLivro();
  }, []);

  const Layout = ({ children }) => (
    <div className="paginaLivro">
      <MenuLateral itemAtivo="O Livro Principal" aoSair={aoSair} />
      <div className="conteudoPrincipalLivro">
        <Cabecalho usuario={usuario} aoSair={aoSair} />
        <main className="areaLivro">{children}</main>
        <Rodape />
      </div>
    </div>
  );

  if (erro) {
    return (
      <Layout>
        <div className="erroContainer"><p>{t.erro}</p></div>
      </Layout>
    );
  }

  if (!livro) {
    return (
      <Layout>
        <div className="loadingContainer">
          <div className="loadingSpinner" />
          <p>{t.carregando}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="conteudoPrincipalLivro__inner">

        <section className="heroLivro">
          <div className="imagemLivro">
            <img
              src={livro.capa || 'https://placehold.co/300x450'}
              alt={livro.titulo}
              onError={(e) => { e.target.src = 'https://placehold.co/300x450'; }}
            />
          </div>

          <div className="infoLivro">
            <h1>{livro.titulo}</h1>

            <p className="subtituloLivro">{t.subtitulo}</p>

            <p className="descricaoLivro">
              {t.publicadoEm(livro.ano, livro.autor)}
            </p>
          </div>
        </section>

        <section className="cardsLivro">
          <div className="cardLivro">
            <h3>{t.resumo}</h3>
            <p>{en ? livro.resumo_en : livro.resumo}</p>
          </div>

          <div className="cardLivro">
            <h3>{t.analise}</h3>
            <p>{en ? livro.analise_en : livro.analise}</p>
          </div>
        </section>

        <section className="personagens">
          <h2>{t.personagens}</h2>
          <p className="subtituloSecao">{t.personagensSubtitulo}</p>

          <div className="gridPersonagens">
            {livro.personagens.length === 0 ? (
              <p className="semPersonagens">{t.semPersonagens}</p>
            ) : (
              livro.personagens.map((personagem, index) => (
                <CartaoPersonagem
                  key={index}
                  nome={personagem.nome}
                  descricao={en ? personagem.descricao_en : personagem.descricao}
                />
              ))
            )}
          </div>
        </section>

        <section className="contextoLivro">
          <img
            src={livro.capa || 'https://placehold.co/300x450'}
            alt={livro.titulo}
            onError={(e) => { e.target.src = 'https://placehold.co/300x450'; }}
          />
          <div className="textoContexto">
            <h2>{t.contextoTitulo}</h2>
            <p>{en ? livro.contexto_en : livro.contexto}</p>
          </div>
        </section>

      </div>
    </Layout>
  );
}
