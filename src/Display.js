import './App.css';
import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Filters } from './Filters.js';
import {updateDisplayData} from './redux';

//manages display on the screen
export function Display () {

    const dispatch = useDispatch();
    //access to data stored by search function
    const redditUpdatedData = useSelector(state => state.redditData);
    //access to currently displayed data
    const DisplayData = useSelector(state => state.displayData);
  
    // checks info in redditUpdatedData and creates a list of threads for display
  function DisplayThreadList () {
    const newList = redditUpdatedData.map(item => {
        return (
        <li key={item[0]} className="thread">
            <div className="threadContent">
              <button onClick={openThread} value={item[0]} className="openButton">OPEN</button>
              <img alt="" src={item[5]}></img>
            </div>
            <div className="threadContent">
              <h2 className="threadStarter">{item[2]}</h2>
              <p>{item[3]}</p>
            </div>
            
        </li>
        )
    })
    // adds filter buttons
    newList.unshift(<Filters DisplayThreadList={DisplayThreadList}/>);
    dispatch(updateDisplayData(newList));
  }

    // creates list of posts in a thread
  function openThreadListMaker (input) {
    const newList = [];
    let i = 0;
    let threadLength = input[1].data.children.length - 1;
    while (i < threadLength) {
      newList.push(
        <li key={`threadItem-${input[1].data.children[i].data.author}${i}`} className="post">
          <h3 className="author">{input[1].data.children[i].data.author}</h3>
          <p>{input[1].data.children[i].data.body}</p>
        </li>);
      i++;
    }
    return newList;
  };

    // opens thread
  async function openThread ({target}) {
    // search correct thread by key value
    let thisThread = redditUpdatedData.find(item => {
        return (target.value === item[0])
        })
    // save info about thread starter
    const thisThreadStarter = (
        <li key='threadStarter' id="firstPost">
            <button onClick={DisplayThreadList}>RETURN</button>
            <div className="post">
              <h2 className="author">{thisThread[2]}</h2>
              <h3>{thisThread[3]}</h3>
              <div id="imageHolder">
                {thisThread[9] ? <img alt='' src={thisThread[9]}></img> : ""}
              </div>
              <p>{thisThread[4]}</p>
            </div>
        </li>
    );
    // search reddit for thread info
    let fetchItem = `https://www.reddit.com/${thisThread[8]}.json`;
    await fetch(fetchItem)
    .then(response => {if (response.ok) {return response.json(); }
      window.alert("something went wrong... try again");
      return '';
    })
    .then(jsonResponse => {
      if (jsonResponse === '') {
        return;
      }
      else {
          // create a list of posts inside the thread
        let newList = openThreadListMaker(jsonResponse);
        // add thread starter post to the beginning of list
        newList.unshift(thisThreadStarter);
        dispatch(updateDisplayData(newList));
      }
    })
    
  };

  // updates display on each change to redditData in redux store
  let useEffectCheck = useSelector(state => state.redditData);
  useEffect(() => {DisplayThreadList()}, [useEffectCheck]);


    return (
        <div>
            <ul id="display">{DisplayData}</ul>
        </div>
    )   
    
}