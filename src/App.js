import './App.css';
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
    this.state = {
      inputText: '',
      display: '',
      threadDisplay: '',
      myList: [],
      myReddit: {},
      threadStarters: [],
      prevSearch: '',
    };
  }
  
  listMakerTen(item) {
    const newList = [];
    const threadStarters = [];
    let i = 0;
    while (i < 10) {
      newList.push(
        <li key={i}>
          <img alt="" src={item.data.children[i].data.thumbnail}/>
          <h2 className="threadStarter">{item.data.children[i].data.title}</h2>
          <button id={i} className="threadStarter" onClick={this.openThread} value={item.data.children[i].data.permalink}>
            more
          </button>
        </li>);
      threadStarters.push(<div><img alt="" src={item.data.children[i].data.url}/><video control='true' alt="" src={item.data.children[i].data.url}></video><h3>{item.data.children[i].data.author}</h3><p>{item.data.children[i].data.selftext}</p></div>)
      i++;
      console.log(item.data.children[i].data.url);
    }
    this.setState({threadStarters: threadStarters})
    console.log(item); // remove this line when finished with coding
    return newList;
  }

  listMaker(input) {
    const newList = [];
    let i = 0;
    let threadLength = input[1].data.children.length;
    while (i < threadLength) {
      newList.push(
        <li key={`00${i}`}>
          <h3>{input[1].data.children[i].data.author}</h3>
          <p>{input[1].data.children[i].data.body}</p>
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
        let newList = [<button onClick={this.dataFetch}>Retrun</button>, <h3>{this.state.threadStarters[target.id]}</h3>, this.listMaker(jsonResponse)];
        this.setState({display: newList});
      }
    })
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
      prevSearch: this.state.inputText
    });
  }

  componentDidMount () {
    this.dataFetch();
  }

  render () {
    return (
      <div id="main">
        <h1 id="pageTitle">Mini Reddit</h1>
        <input id="search" onChange={this.handleChange}></input>
        <button id="searchButton" onClick={this.dataFetch} value="">Search</button>
        <p>Filters</p>
        <button id="replies">Number of replies</button>
        <button id="upvotes">Number of upvotes</button>
        <button id="date">Newest First</button>
        <div id="searchResults"><ul>{this.state.display}</ul></div>
        <div id="threadDisplay"><ul>{this.state.threadDisplay}</ul></div>
      </div>
    )
  }

};
