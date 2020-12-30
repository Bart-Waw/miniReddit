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
        <li key={item[0]}>
            <h3>{item[2]}</h3>
            <img alt="" src={item[5]}></img>
            <h2>{item[3]}</h2>
            <button onClick={openThread} value={item[0]}>Open</button>
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
        <li key={`threadItem-${input[1].data.children[i].data.author}${i}`}>
          <h3>{input[1].data.children[i].data.author}</h3>
          <div>{input[1].data.children[i].data.body}</div>
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
        <li key='threadStarter'>
            <div><button onClick={DisplayThreadList}>Return</button></div>
            <img alt='' src={thisThread[9]}></img>
            <h3>{thisThread[2]}</h3>
            <h2>{thisThread[3]}</h2>
            <p>{thisThread[4]}</p>
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
            <ul>{DisplayData}</ul>
        </div>
    )   
    
}