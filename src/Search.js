import './App.css';
import React from 'react';

export function Search (props) {

    return (
      <div>
        <input id="search" onChange={props.handleChange}></input>
        <button id="searchButton" onClick={props.dataFetch} value="">Search</button>
      </div>
    )
}