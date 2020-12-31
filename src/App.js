import './App.css';
import { Search } from './Search.js';
import { Display } from './Display.js';

function App () {
  return (
    <div id="main">
      <h1 id="pageTitle">miniREDDIT</h1>
      <Search />
      <Display />
    </div>
  )
};

export default App;