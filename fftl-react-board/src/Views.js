import React from 'react';
import Routes from './routes/Routes';
import Board from './views/Board';
import './Views.css';

function Views() {
    return (
        <div>
            <div id="header" className="header">
                <div>
                    <h3>Board CRUD</h3>
                </div>
            </div>
            <div id="sidebar" className="sidebar">
                <Board />
            </div>
            <div id="content" className="content">
                <Routes />
            </div>
        </div>
    );
}

export default Views;
