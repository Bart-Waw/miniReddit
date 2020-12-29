import './App.css';
import React from 'react';

export function Filters (props) {
    
    return (
        <div id="Filters">
            <p>Filters</p>
            <ul>
                <li><button onClick={props.filterByReplies} id="replies">Number of replies</button></li>
                <li><button onClick={props.filterByUpvotes} id="upvotes">Number of upvotes</button></li>
                <li><button onClick={props.filterByDate} id="date">Newest first</button></li>
            </ul>     
        </div>
    )   
}