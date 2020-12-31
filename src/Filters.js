import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';

export function Filters (props) {

    // var storing RedditData from redux store
    const redditUpdatedData = useSelector(
        state => state.redditData
      )

    function filterByReplies () {
        redditUpdatedData.sort(function (b, a) {
          return a[6] - b[6];
        } );
        props.DisplayThreadList();
      };
    
     function filterByUpvotes () {
        redditUpdatedData.sort(function (b, a) {
          return a[7] - b[7];
        } );
        props.DisplayThreadList();
      };
    
      function filterByDate () {
        redditUpdatedData.sort(function (b, a) {
          return a[1] - b[1];
        } );
        props.DisplayThreadList();
      };
    
    return (
        
        <div id="Filters">
            <h2 className="filter">Sort by:</h2>
            <ul className="filter">
                <li className="filter"><button onClick={filterByReplies} id="replies">Number of replies</button></li>
                <li className="filter"><button onClick={filterByUpvotes} id="upvotes">Number of upvotes</button></li>
                <li className="filter"><button onClick={filterByDate} id="date">Newest first</button></li>
            </ul>     
        </div>
    )   

    
}