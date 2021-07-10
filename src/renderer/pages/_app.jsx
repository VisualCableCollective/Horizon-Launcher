// -------- Components --------
// Overlays
import LoadingOverlay from "../components/overlays/LoadingOverlay";
// ----------------

// Styles
import "../styles/App.css";

// Modules
import {useState} from "react";
import {LoadingOverlayContextProvider} from "../contexts/loading-overlay-context";

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <LoadingOverlayContextProvider>
                <LoadingOverlay />
                <Component {...pageProps} />
            </LoadingOverlayContextProvider>
        </div>
    )
}

export default MyApp;