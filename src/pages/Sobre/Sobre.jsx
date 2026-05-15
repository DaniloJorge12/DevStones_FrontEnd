import './Sobre.css';
import MenuLateral from '../../components/Drawer/MenuLateral.jsx';
import Cabecalho from '../../components/Layout/Cabecalho.jsx';
import Rodape from '../../components/Layout/Rodape.jsx';
import TopoSobre from '../../components/Sobre/TopoSobre.jsx';

export default function Sobre({ usuario, aoSair }) {

    return (
        <div className="paginaSobre">
            <MenuLateral itemAtivo="Sobre" aoSair={aoSair} />

            <div className="conteudoSobre">
                <Cabecalho usuario={usuario} aoSair={aoSair} />

                <main className="areaSobre">
                    <div className="conteudoSobreInterno">
                        <TopoSobre/>
                    </div>
                </main>

                <Rodape />
            </div>
        </div>
    );
}
