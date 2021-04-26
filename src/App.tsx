// Overlays
import LoadingOverlay from "./overlays/LoadingOverlay";

// Pages
import HomePage from "./pages/HomePage";

// Modules
import {useState} from "react";

import './App.css';

function App() {
  const [isLoadingOverlayVisible, setIsLoadingOverlayVisible] = useState(false);

  return (
    <div className="App font-titillium-web text-white">
      <LoadingOverlay isVisible={isLoadingOverlayVisible}/>
      <HomePage/>
    </div>
  );
}

export default App;
