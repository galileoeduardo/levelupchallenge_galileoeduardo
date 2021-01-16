import React from 'react';
import './style.css';


const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li style={{ fontSize: "1.2em"}}>Buscar cep</li>
                    <li>CSS</li>
                    <li>Componentes</li>
                    <li>Javascript</li>
                    <li>HTML</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;