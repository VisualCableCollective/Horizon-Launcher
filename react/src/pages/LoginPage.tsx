import Config from "../Config";

// Pages
import HomePage from "../pages/HomePage";

// Handlers
import WebsocketHandler from "../handlers/WebsocketHandler";
import HorizonAPIClientHandler from "../handlers/HorizonAPIClientHandler";
import Log from "../handlers/Log";

// Icons
import { IconContext } from "react-icons";
import { ImSpinner8 } from "react-icons/im";

// Modules
import { useEffect, useState } from 'react';
import PropTypes, { InferProps } from "prop-types";
const electron = window.require("electron");
const { ipcRenderer } = window.require("electron");

function LoginPage({ setCurrentPage, setIsLoadingOverlayVisible }: InferProps<typeof LoginPage.propTypes>) {
    let [currentDialog, setCurrentDialog] = useState<JSX.Element>();
    // Initial stuff
    useEffect(() => {
        let authTokenInStorage: string = ipcRenderer.sendSync('get-launcher-config-value', { key: "authToken" });
        if (authTokenInStorage) {
            IsAuthTokenValid(authTokenInStorage).then((result: boolean) => {
                if (result) {
                    setCurrentPage(<HomePage />);
                    if (setIsLoadingOverlayVisible) {
                        setIsLoadingOverlayVisible(false);
                    }
                } else {
                    setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} setCurrentPage={setCurrentPage} />);
                    if (setIsLoadingOverlayVisible) {
                        setIsLoadingOverlayVisible(false);
                    }
                }
            })
        } else {
            setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} setCurrentPage={setCurrentPage} />);
            if (setIsLoadingOverlayVisible) {
                setIsLoadingOverlayVisible(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="login-page min-h-screen min-w-full flex items-center justify-center" style={{ backgroundColor: "#0f0f0f" }}>
            <div className="px-14 py-10 w-full max-w-md" style={{ backgroundColor: "#242424" }}>
                {currentDialog}
            </div>
        </div>
    );
}
LoginPage.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    setIsLoadingOverlayVisible: PropTypes.func,
}

async function IsAuthTokenValid(authToken: string, callback: void) {
    let isTokenValid = await HorizonAPIClientHandler.client.authenticateUserWithToken(authToken);
    if (isTokenValid) {
        Log.info("AuthTokenValidator", "Successfully validated the token");
        return true;
    } else {
        Log.error("AuthTokenValidator", "Token was invalid");
        return false;
    }
}

function SelectLoginOptionDialog({ setCurrentDialog, setCurrentPage }: InferProps<typeof SelectLoginOptionDialog.propTypes>) {
    function LoginUsingBrowserOptionButtonClicked() {
        setCurrentDialog(<LoginUsingBrowserDialog setCurrentDialog={setCurrentDialog} setCurrentPage={setCurrentPage} />)
        electron.shell.openExternal(Config.getAPIServerURL() + "/auth/vcc/redirect?socketID=" + encodeURI(WebsocketHandler.echoHandler.socketId()))
    }
    return (
        <div className="dialog">
            <h1 className="text-lg font-semibold">Sign In To Your Horizon Account</h1>
            <div className="my-4 grid gap-3">
                <button className="px-5 py-3 w-full bg-opacity-60 hover:bg-opacity-80 focus:bg-opacity-100 outline-none focus:outline-none bg-button-1 rounded-sm transition-all duration-100"
                    onClick={LoginUsingBrowserOptionButtonClicked}>
                    Sign in using your browser
                    </button>
                <button className="px-5 py-3 w-full bg-opacity-60 cursor-not-allowed	 outline-none focus:outline-none bg-button-1 disabled:opacity-50 rounded-sm transition-all duration-100" disabled>
                    Sign in using the Horizon app
                    </button>
            </div>
            <div className="flex justify-center">
                <p className="text-sm text-opacity-60 text-white mr-1">Don't have an Horizon account yet?</p>
                <button className="text-sm font-medium">Sign Up</button>
            </div>
        </div>
    );
}
SelectLoginOptionDialog.propTypes = {
    setCurrentDialog: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
}

function LoginUsingBrowserDialog({ setCurrentDialog, setCurrentPage }: InferProps<typeof LoginUsingBrowserDialog.propTypes>) {
    // Initial stuff
    useEffect(() => {
        WebsocketHandler.echoHandler.channel("client." + WebsocketHandler.echoHandler.socketId())
            .listen('.user.authorized', (e: any) => {
                if (e.authToken) {
                    setCurrentDialog(<WaitUntilLoggedInDialog receivedAuthToken={e.authToken} setCurrentDialog={setCurrentDialog} setCurrentPage={setCurrentPage} />);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Specify how to clean up after unmount
        return function cleanup() {
            WebsocketHandler.echoHandler.channel("client." + WebsocketHandler.echoHandler.socketId()).stopListening(".user.authorized");
        };
    });

    function CancelButtonClicked() {
        setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} setCurrentPage={setCurrentPage} />)
    }

    return (
        <div className="dialog">
            <h1 className="text-lg font-semibold">Complete your login in your browser.</h1>
            <p className="text-sm text-opacity-60 text-white mr-1">We'll refresh this page when you are signed in.</p>
            <div className="my-4 grid gap-3">
                <button className="px-5 py-3 w-full bg-opacity-60 hover:bg-opacity-80 focus:bg-opacity-100 outline-none focus:outline-none bg-button-1 rounded-sm transition-all duration-100"
                    onClick={CancelButtonClicked}>
                    Cancel
            </button>
            </div>
        </div>
    );
}
LoginUsingBrowserDialog.propTypes = {
    setCurrentDialog: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
}

function WaitUntilLoggedInDialog({ setCurrentDialog, receivedAuthToken, setCurrentPage }: InferProps<typeof WaitUntilLoggedInDialog.propTypes>) {
    // Initial stuff
    useEffect(() => {
        if (receivedAuthToken === '') {
            setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} setCurrentPage={setCurrentPage} />);
        }
        IsAuthTokenValid(receivedAuthToken).then((result: boolean) => {
            if (result) {
                let result: boolean = ipcRenderer.sendSync('set-launcher-config-value', { key: "authToken", value: receivedAuthToken.trim() })
                if (result === false) {
                    // ToDo: show error in UI
                    setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} setCurrentPage={setCurrentPage} />);
                } else {
                    setCurrentPage(<HomePage />);
                }
            } else {
                // ToDo: show error in UI
                setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} setCurrentPage={setCurrentPage} />);
            }
        })
        /*ipcRenderer.invoke('set-launcher-config-value', {key: "authToken", value: receivedAuthToken.trim() }).then((result: boolean) => {
            if(result === false){
                setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} setCurrentPage={setCurrentPage}/>);
                return;
            }else{
                setCurrentPage(<HomePage />)
            }
          })*/
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="dialog">
            <div className="flex justify-center">
                <IconContext.Provider value={{ className: "animate-spin-faster mb-3", size: "2em" }}>
                    <ImSpinner8 />
                </IconContext.Provider>
            </div>
            <h1 className="text-lg font-semibold text-center">Signing In.</h1>
            <p className="text-sm text-opacity-60 text-white mr-1 text-center">Please wait until you are signed in successfully.</p>
        </div>
    );
}
WaitUntilLoggedInDialog.propTypes = {
    setCurrentDialog: PropTypes.func.isRequired,
    receivedAuthToken: PropTypes.string.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
}

export default LoginPage;