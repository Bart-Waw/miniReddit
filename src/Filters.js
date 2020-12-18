import './App.css';
import React from 'react';

export class Filters extends React.Component {

    render () {
        return (
            <div id="Filters">
                <p>Filters</p>
                <ul>
                    <li><button id="replies">Number of replies</button></li>
                    <li><button id="upvotes">Number of upvotes</button></li>
                    <li><button id="date">Newest First</button></li>
                </ul>     
            </div>
        )
    }
    
}