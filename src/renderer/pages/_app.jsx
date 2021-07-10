import LoadingOverlay from "../components/overlays/LoadingOverlay";

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <LoadingOverlay isVisible={true} />
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp;