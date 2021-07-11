// -------- Components --------
// Overlays
import LoadingOverlay from "../components/overlays/LoadingOverlay";
// ----------------

// Contexts
import {LoadingOverlayContextProvider} from "../contexts/loading-overlay-context";

// Styles
import "../styles/App.css";

// Modules
import {useEffect} from "react";
import {useRouter} from "next/router";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    // Init
    useEffect(() => {
        router.push('/auth/login');
    }, []);

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