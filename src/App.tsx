// Components
import TitleBar from "./components/TitleBar";

// Overlays
import LoadingOverlay from "./overlays/LoadingOverlay";

// Pages
import HomePage from "./pages/HomePage";

// Modules
import {useState} from "react";

import './App.css';

function App() {
  const [isLoadingOverlayVisible, setIsLoadingOverlayVisible] = useState(true);

  return (
    <div className="App font-titillium-web text-white">
      <LoadingOverlay isVisible={isLoadingOverlayVisible}/>
      <div className="home">
        <TitleBar/>
        <HomePage/>
      </div>
    </div>
  );
}

export default App;
