// Dialogs
import SelectLoginOptionDialog from "../../components/dialogs/login/SelectLoginOptionDialog";

// Contexts
import LoadingOverlayContext from "../../contexts/loading-overlay-context";

// Modules
import {useState, useEffect, useContext} from "react";
import electron from 'electron';

// Custom Modules
import {HorizonAPIClient} from "horizon-api-client-ts";

const ipcRenderer = electron.ipcRenderer || false;

function Login() {
    // Contexts
    let loadingOverlayCtx = useContext(LoadingOverlayContext);

    // States
    let [currentDialog, setCurrentDialog] = useState();

    // Init
    useEffect(() => {
        let authTokenInStorage = ipcRenderer.sendSync('get-launcher-config-value', { key: "authToken" });
        if (authTokenInStorage) {
            IsAuthTokenValid(authTokenInStorage).then((result) => {
                if (result) {
                    // set current page home page
                    loadingOverlayCtx.setIsVisible(false);
                } else {
                    setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} />);
                    loadingOverlayCtx.setIsVisible(false);
                }
            })
        } else {
            setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} />);
            loadingOverlayCtx.setIsVisible(false);
        }
    }, []);
}

async function IsAuthTokenValid(authToken, callback) {
    let isTokenValid = await HorizonAPIClient.authenticateUserWithToken(authToken);
    if (isTokenValid) {
        Log.info("AuthTokenValidator", "Successfully validated the token");
        return true;
    } else {
        Log.error("AuthTokenValidator", "Token was invalid");
        return false;
    }
}

export default Login;