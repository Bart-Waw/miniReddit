import './App.css';
import React from 'react';
import {updateInputValue, updateRedditData} from './redux';
import {useDispatch, useSelector} from 'react-redux';
const redditSearchPath = "https://www.reddit.com/search.json?q="

// controls input field and searches for data in reddit
export function Search () {

  // required to dispatch data to store
  const dispatch = useDispatch();
  // variable for stored inputField data
  const inputField = useSelector(
    state => state.inputFieldValue
  )
  
  // stores inputField data
  function handleChange ({target}) {
    const newVal = updateInputValue(target.value); // use updateValue action to store current input value in var
    dispatch(newVal); // use var to dispatch the value to store
  };

  //fetches data from reddit and stores as redditData object
  async function dataFetch () {
    let fetchItem = '';
    await handleChange;
    if (inputField === '') {
      fetchItem = 'https://www.reddit.com/r/popular.json';
    }
    else {
      fetchItem = `${redditSearchPath + inputField}`;
    }
    await fetch(fetchItem)
    .then(response => {if (response.ok) {return response.json(); }
      throw new Error("Request failed");
    }, newtworkError => console.log(newtworkError.message))
    .then(jsonResponse => {
      threadListMaker(jsonResponse);
    })
  };

  //creates a list of threads as objects from the JSONresponse received from dataFetch function
  function threadListMaker (jsonVal) {
    const newList = [];
    let counter = 0;
    jsonVal.data.children.forEach(item => {
      newList.push([
        `threadStarter-${counter}`,
        item.data.created_utc,
        item.data.author,
        item.data.title,
        item.data.selftext,
        item.data.thumbnail,
        item.data.num_comments,
        item.data.ups,
        item.data.permalink,
        item.data.url,
      ])
      counter++;
    })
    dispatch(updateRedditData(newList));
  }

  async function runSearch () {
    await dataFetch()
    
    
    //const newList = await threadListMaker(jsonResponse);
    //console.log(newList);
  }

  
    return (
      <div>
        <input id="searchInput" onChange={handleChange}></input>
        <button id="searchButton" onClick={runSearch} value="">Search</button>
      </div>
    )

    
}