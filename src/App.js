import './App.css';
import { Search } from './Search.js';
import { Filters } from './Filters.js';
import React, { useState } from 'react';
const redditSearchPath = "https://www.reddit.com/search.json?q="

function App () {
  const [inputText, setInputText] = useState("");
  const [display, setDisplay] = useState("");
  const [threadDisplay, setThreadDisplay] = useState("");
  const [myReddit, setMyReddit] = useState({});
  const [threadStarters, setThreadStarters] = useState([]);

  
  async function dataFetch () {
    let fetchItem = '';
    await handleChange;
    if (inputText === '') {
      fetchItem = 'https://www.reddit.com/r/popular.json';
    }
    else {
      fetchItem = `${redditSearchPath + inputText}`;
    }

    await fetch(fetchItem)
    .then(response => {if (response.ok) {return response.json(); }
      throw new Error("Request failed");
    }, newtworkError => console.log(newtworkError.message))
    .then(jsonResponse => {
      setMyReddit(jsonResponse);
    });
    let newList = listMakerTen(myReddit);
    setDisplay(newList);
  };
  
  function listMakerTen (item) {
    const newList = [];
    const threadStarters = [];
    let i = 0;
    while (i < 10) {
      let timeStamp = myReddit.data.children[i].data.created_utc;
      let date = new Date(timeStamp * 1000);
      let dateOutput = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      newList.push(
        <li className="threadStarter" key={`thread-${i}`}>
          <h3>{myReddit.data.children[i].data.author}</h3>
          <h2>{myReddit.data.children[i].data.title}</h2>
          <img alt="" src={myReddit.data.children[i].data.thumbnail}/>
          <p>Comments: {myReddit.data.children[i].data.num_comments}</p>
          <p>Upvotes: {myReddit.data.children[i].data.ups}</p>
          <p>Creation date: {dateOutput}</p>
          <button id={i} className="threadStarter" onClick={openThread} value={myReddit.data.children[i].data.permalink}>
            Open
          </button>
        </li>);
      threadStarters.push(
        <div>
          <img alt="" src={item.data.children[i].data.url}/>
          <h3>{item.data.children[i].data.author}</h3>
          <h4>{item.data.children[i].data.title}</h4>
          <div>{item.data.children[i].data.selftext}</div>
        </div>)
      i++;
    }
    setThreadStarters(threadStarters);
    return newList;
  };

  function listMaker (input) {
    const newList = [];
    let i = 0;
    let threadLength = input[1].data.children.length - 1;
    while (i < threadLength) {
      newList.push(
        <li key={`threadItem-${i}`}>
          <h3>{input[1].data.children[i].data.author}</h3>
          <div>{input[1].data.children[i].data.body}</div>
        </li>);
      i++;
    }
      return newList;
  };
  
  async function openThread ({target}) {
    setThreadDisplay("");
    let fetchItem = `https://www.reddit.com/${target.value}.json`;
    fetch(fetchItem)
    .then(response => {if (response.ok) {return response.json(); }
      window.alert("something went wrong... try again");
      return '';
    })
    .then(jsonResponse => {
      if (jsonResponse === '') {
        return;
      }
      else {
        let newList = [
          <button onClick={returnButton}>Retrun</button>, 
          threadStarters[target.id], 
          listMaker(jsonResponse)
          ];
        setDisplay(newList);
      }
    })
  };

  function returnButton () {
    let newList = listMakerTen(myReddit);
    setThreadDisplay('');
    setDisplay(newList);
  };

  function filterByReplies () {
    myReddit.data.children.sort(function (b, a) {
      return a.data.num_comments - b.data.num_comments;
    } );
    let newList = listMakerTen(myReddit);
    setDisplay(newList);
  };

 function filterByUpvotes () {
    myReddit.data.children.sort(function (b, a) {
      return a.data.ups - b.data.ups;
    } );
    let newList = listMakerTen(myReddit);
    setDisplay(newList);
  };

  function filterByDate () {
    myReddit.data.children.sort(function (b, a) {
      return a.data.created - b.data.created;
    } );
    let newList = listMakerTen(myReddit);
    setDisplay(newList);
  };

  function handleChange ({target}) {
    setInputText(target.value);
  };

  return (
    <div id="main">
      <h1 id="pageTitle">Mini Reddit</h1>
      <Search handleChange={handleChange} 
              dataFetch={dataFetch}/>
      <Filters  filterByReplies={filterByReplies} 
                filterByUpvotes={filterByUpvotes}
                filterByDate={filterByDate}/>
        <div id="searchResults"><ul>{display}</ul></div>
        <div id="threadDisplay"><ul>{threadDisplay}</ul></div>
    </div>
  )};

export default App;