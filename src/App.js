import logo from './logo.svg';
import {useEffect} from "react";
import './App.css';


function App(props) {
  const fetchData = async () => {
    const res = fetch('/api/test.php').then(res => res.json());
    return res;
  }
  useEffect(() => {
    fetchData().then((rs) => {
      console.log(rs)
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
