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

useEffect(() => {
    async function buscarIntegrantes() {
        try {
            const resposta = await fetch('/api/equipe', {
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
                    </div>
                </main>

                <Rodape />
            </div>
        </div>
    );
}
