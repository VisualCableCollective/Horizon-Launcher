// Assets
import LoadingIndicator from "../assets/UI/loading-indicator.gif";

// Modules
import PropTypes, { InferProps } from "prop-types";

function LoadingOverlay({ isVisible }: InferProps<typeof LoadingOverlay.propTypes>) {
    return (
        <div className={"loading-overlay absolute z-10 min-w-full min-h-screen flex items-center justify-center bg-black transition-opacity duration-500 " + (isVisible ? "opacity-100 pointer-events-none" : " opacity-0")}>
            <img src={LoadingIndicator.toString()} alt="Loading..."  style={{maxHeight: "100px"}} />
        </div>
    );
}
LoadingOverlay.propTypes = {
    isVisible: PropTypes.bool.isRequired
}

export default LoadingOverlay;