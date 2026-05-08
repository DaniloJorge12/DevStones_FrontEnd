import React from 'react';
import './styles.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon"></div>
                <span className="logo-text">DevStone</span>
            </div>

            <small className="menu-label">MENU DE NAVEGAÇÃO</small>
            <nav className="sidebar-nav">
                <ul>
                    <li className="nav-item active">
                        <span className="icon-placeholder"></span>
                        <span>Início</span>
                    </li>
                    <li className="nav-item">
                        <span className="icon-placeholder"></span>
                        <span>O Livro Principal</span>
                    </li>
                    <li className="nav-item">
                        <span className="icon-placeholder"></span>
                        <span>Biblioteca</span>
                    </li>
                    <li className="nav-item">
                        <span className="icon-placeholder"></span>
                        <span>Comunidade & Dicas</span>
                    </li>
                    <li className="nav-item">
                        <span className="icon-placeholder"></span>
                        <span>Simulados & Quiz</span>
                    </li>
                    <li className="nav-item">
                        <span className="icon-placeholder"></span>
                        <span>Videoaulas</span>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="nav-item">
                    <span className="icon-placeholder circle"></span>
                    <span>Sobre a Equipe</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
