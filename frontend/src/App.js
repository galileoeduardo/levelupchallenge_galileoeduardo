import React from 'react';
import Header from './pages/Header';
import BuscarCep from './pages/BuscarCep';
import './App.css';

const App = () => {
    return (
        <div className="wrapper">
            <Header/>
            <BuscarCep/>
        </div>
    );
};

export default App;