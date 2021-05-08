// Overlays
import LoadingOverlay from "./overlays/LoadingOverlay";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Handlers
import WebsocketHandler from "./handlers/WebsocketHandler";

// Modules
import { useState, useEffect } from "react";

import './App.css';

const {ipcRenderer} = window.require("electron");

function App() {
  const [isLoadingOverlayVisible, setIsLoadingOverlayVisible] = useState(true);
  const [canRenderPage, setCanRenderPage] = useState(false);
  let currentPage = null;

  useEffect(() => {
    ipcRenderer.sendSync("init");

    WebsocketHandler.Init();
    WebsocketHandler.echoHandler.connector.pusher.connection.bind('connected', () => {
      setCanRenderPage(true);
      setIsLoadingOverlayVisible(false);
    });
  }, []);

  currentPage = <LoginPage />;

  return (
    <div className="App font-titillium-web text-white">
      <LoadingOverlay isVisible={isLoadingOverlayVisible} />
      { canRenderPage ? currentPage : null}
    </div>
  );
}

export default App;
