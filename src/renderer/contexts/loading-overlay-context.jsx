import {createContext, useState} from "react";

const LoadingOverlayContext = createContext({
    isVisible: true,
    setIsVisible: (isVisible) => {}
});

export function LoadingOverlayContextProvider(props) {
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    function setIsVisibleHandler(isVisible) {
        setIsOverlayVisible(isVisible);
    }

    const context = {
        isVisible: isOverlayVisible,
        setIsVisible: setIsVisibleHandler,
    };

    return (
        <LoadingOverlayContext.Provider value={context}>
            {props.children}
        </LoadingOverlayContext.Provider>
    );
}

export default LoadingOverlayContext;