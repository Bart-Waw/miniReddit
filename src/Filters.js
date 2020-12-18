import './App.css';
import React from 'react';

export class Filters extends React.Component {

    render () {
        return (
            <div id="Filters">
                <p>Filters</p>
                <ul>
                    <li><button onClick={this.props.filterByReplies} id="replies">Number of replies</button></li>
                    <li><button onClick={this.props.filterByUpvotes} id="upvotes">Number of upvotes</button></li>
                    <li><button onClick={this.props.filterByDate} id="date">Newest First</button></li>
                </ul>     
            </div>
        )
    }
    
}