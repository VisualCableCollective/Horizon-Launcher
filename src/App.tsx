// Overlays
import LoadingOverlay from "./overlays/LoadingOverlay";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Handlers
import WebsocketHandler from "./handlers/WebsocketHandler";

// Modules
import { useState } from "react";

import './App.css';

function App() {
  const [isLoadingOverlayVisible, setIsLoadingOverlayVisible] = useState(false);

  WebsocketHandler.Init();

  return (
    <div className="App font-titillium-web text-white">
      <LoadingOverlay isVisible={isLoadingOverlayVisible} />
      <LoginPage />
    </div>
  );
}

export default App;
