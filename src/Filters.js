// FINISHED AND WORKS OKAY !!

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
            <p>Filters</p>
            <ul>
                <li><button onClick={filterByReplies} id="replies">Number of replies</button></li>
                <li><button onClick={filterByUpvotes} id="upvotes">Number of upvotes</button></li>
                <li><button onClick={filterByDate} id="date">Newest first</button></li>
            </ul>     
        </div>
    )   

    
}