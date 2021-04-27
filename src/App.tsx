// Overlays
import LoadingOverlay from "./overlays/LoadingOverlay";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Modules
import {useState} from "react";

import './App.css';

function App() {
  const [isLoadingOverlayVisible, setIsLoadingOverlayVisible] = useState(false);

  return (
    <div className="App font-titillium-web text-white">
      <LoadingOverlay isVisible={isLoadingOverlayVisible}/>
      <LoginPage/>
    </div>
  );
}

export default App;
