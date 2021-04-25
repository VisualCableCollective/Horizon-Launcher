// Components
import TitleBar from "./components/TitleBar";

// Pages
import HomePage from "./pages/HomePage";

import './App.css';

function App() {
  return (
    <div className="App font-titillium-web text-white">
      <div className="home">
        <TitleBar/>
        <HomePage/>
      </div>
    </div>
  );
}

export default App;
