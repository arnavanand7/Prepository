import './App.scss';

import { BrowserRouter as Router, withRouter } from "react-router-dom";
import Main from './Components/MainComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <Main />
      </Router>
    </div>
  );
}

export default App;
