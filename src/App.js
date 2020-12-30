import './App.css';
import { Search } from './Search.js';
import { Display } from './Display.js';

function App () {
  /*

  

  function returnButton () {
    let newList = listMakerTen(myReddit);
    setDisplay(newList);
  };


*/
  return (
    <div id="main">
      <h1 id="pageTitle">Mini Reddit</h1>
      <Search />
      <Display />
    </div>
  )
};

export default App;