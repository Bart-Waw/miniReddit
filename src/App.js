import './App.css';
import { Search } from './Search.js';
import { Filters } from './Filters.js';
import React from 'react';
const redditSearchPath = "https://www.reddit.com/search.json?q="

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.dataFetch = this.dataFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.listMakerTen = this.listMakerTen.bind(this);
    this.listMaker = this.listMaker.bind(this);
    this.openThread = this.openThread.bind(this);
    this.returnButton = this.returnButton.bind(this);
    this.filterByReplies = this.filterByReplies.bind(this);
    this.filterByUpvotes = this.filterByUpvotes.bind(this);
    this.filterByDate = this.filterByDate.bind(this);
    this.state = {
      inputText: '',
      display: '',
      threadDisplay: '',
      myReddit: {},
      threadStarters: [],
    };
  }
  
  listMakerTen(item) {
    const newList = [];
    const threadStarters = [];
    let i = 0;
    while (i < 10) {
      let timeStamp = this.state.myReddit.data.children[i].data.created_utc;
      let date = new Date(timeStamp * 1000);
      let dateOutput = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      newList.push(
        <li className="threadStarter" key={`thread-${i}`}>
          <h3>{this.state.myReddit.data.children[i].data.author}</h3>
          <h2>{this.state.myReddit.data.children[i].data.title}</h2>
          <img alt="" src={this.state.myReddit.data.children[i].data.thumbnail}/>
          <p>Comments: {this.state.myReddit.data.children[i].data.num_comments}</p>
          <p>Upvotes: {this.state.myReddit.data.children[i].data.ups}</p>
          <p>Creation date: {dateOutput}</p>
          <button id={i} className="threadStarter" onClick={this.openThread} value={this.state.myReddit.data.children[i].data.permalink}>
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
    this.setState({threadStarters: threadStarters})
    // console.log(item); // remove this line when finished with coding
    return newList;
  }

  listMaker(input) {
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
  }


  async openThread({target}) {
    this.setState({threadDisplay: ""});
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
          <button onClick={this.returnButton}>Retrun</button>, 
          this.state.threadStarters[target.id], 
          this.listMaker(jsonResponse)
          ];
        this.setState({display: newList});
      }
    })
  }


  returnButton () {
    let newList = this.listMakerTen(this.state.myReddit);
    this.setState({
      display: newList,
      threadDisplay: '',
    });
  }

  filterByReplies () {
    this.state.myReddit.data.children.sort(function (b, a) {
      return a.data.num_comments - b.data.num_comments;
    } );
    let newList = this.listMakerTen(this.state.myReddit);
    this.setState({
      display: newList,
    });
  }

  filterByUpvotes () {
    this.state.myReddit.data.children.sort(function (b, a) {
      return a.data.ups - b.data.ups;
    } );
    let newList = this.listMakerTen(this.state.myReddit);
    this.setState({
      display: newList,
    });
  }

  filterByDate () {
    console.log(this.state.myReddit);
    this.state.myReddit.data.children.sort(function (b, a) {
      return a.data.created - b.data.created;
    } );
    let newList = this.listMakerTen(this.state.myReddit);
    this.setState({
      display: newList,
    });
  }


  handleChange ({target}) {
    this.setState({inputText: target.value});
  }


  async dataFetch () {
    let fetchItem = '';
    await this.handleChange;
    if (this.state.inputText === '') {
      fetchItem = 'https://www.reddit.com/r/popular.json';
    }
    else {
      fetchItem = `${redditSearchPath + this.state.inputText}`;
    }
    await fetch(fetchItem)
    .then(response => {if (response.ok) {return response.json(); }
      throw new Error("Request failed");
    }, newtworkError => console.log(newtworkError.message))
    .then(jsonResponse => {
      this.setState({myReddit: jsonResponse});
    })
    let newList = this.listMakerTen(this.state.myReddit);
    this.setState({
      display: newList,
    });
  }


  render () {
    return (
      <div id="main">
        <h1 id="pageTitle">Mini Reddit</h1>
        <Search handleChange={this.handleChange} 
                dataFetch={this.dataFetch}/>
        <Filters  filterByReplies={this.filterByReplies} 
                  filterByUpvotes={this.filterByUpvotes}
                  filterByDate={this.filterByDate}/>
          <div id="searchResults"><ul>{this.state.display}</ul></div>
          <div id="threadDisplay"><ul>{this.state.threadDisplay}</ul></div>
      </div>
    )
  }

};