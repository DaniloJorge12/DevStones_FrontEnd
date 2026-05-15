import { useState } from 'react';
import './Sobre.css';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import TopoSobre from '../../components/Sobre/TopoSobre.jsx';
import GradeIntegrantes from '../../components/Sobre/GradeIntegrantes.jsx';

export default function Sobre({ usuario, aoSair }) {
    const [busca, setBusca] = useState('');

    const listaIntegrantes = [
        {
            id: 1,
            titulo: 'Danilo Jorge',
            categoria: 'P.O. Developer',
            autor: 'Sesi/Senai',
            imagem: 'foto.png',
        }, //Isso é uma base grupo, adicionem seus nomes no objeto
    ];

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

                        <GradeIntegrantes integrante={listaIntegrantes} />
                    </div>
                </main>

                <Rodape />
            </div>
        </div>
    );
}
