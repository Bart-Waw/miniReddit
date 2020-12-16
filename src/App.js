import './App.css';
import React from 'react';
const redditSearchPath = "https://www.reddit.com/search.json?q="

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.dataFetch = this.dataFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.listMaker = this.listMaker.bind(this);
    this.state = {
      inputText: '',
      display: '',
      myList: [],
      myReddit: {},
    };
  }
  
  listMaker(item) {
    console.log(item.data.children[0].data.title);
    const newList = [];
    let i = 0;
    while (i < 10) {
      console.log(item.data.children[i].data.title);
      newList.push(<li>{item.data.children[i].data.title}</li>);
      i++;
    }
    return newList;
  }

  handleChange ({target}) {
    this.setState({inputText: target.value});
  }

  async dataFetch () {
    await this.handleChange;
    await fetch(redditSearchPath + this.state.inputText)
    .then(response => {if (response.ok) {return response.json(); }
      throw new Error("Reqeust failed");
    }, newtworkError => console.log(newtworkError.message))
    .then(jsonResponse => {
      this.setState({myReddit: jsonResponse});
    })
    let newList = this.listMaker(this.state.myReddit);
    this.setState({display: newList});
  }

  render () {
    return (
      <div id="main">
        <h1 id="pageTitle">Mini Reddit</h1>
        <input id="search" onChange={this.handleChange}></input>
        <button id="searchButton" onClick={this.dataFetch}>Search</button>
        <div id="searchResults"><ul>{this.state.display}</ul></div>
      </div>
    )
  }
  
};
