import './App.css';
import React from 'react';

export class Search extends React.Component {

  /*componentDidMount () {

    this.props.dataFetch();
  }*/

    render () {
        return (
            <div>
                <input id="search" onChange={this.props.handleChange}></input>
                <button id="searchButton" onClick={this.props.dataFetch} value="">Search</button>
            </div>
        )
    }
    
}