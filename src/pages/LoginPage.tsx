import Config from "../Config";

// Handlers
import WebsocketHandler from "../handlers/WebsocketHandler";

// Modules
import { useEffect, useState } from 'react';
import PropTypes, { InferProps } from "prop-types";
const electron = window.require("electron");

function LoginPage() {
    let [currentDialog, setCurrentDialog] = useState<JSX.Element>();

    // Initial stuff
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} />);
        WebsocketHandler.echoHandler.channel("client." + WebsocketHandler.echoHandler.socketId())
            .listen('.user.authorized', (e: any) => {
                console.log("got token: " + e.authToken);
            });
    }, []);

    useEffect(() => {
        // Specify how to clean up after unmount
        return function cleanup() {
            WebsocketHandler.echoHandler.channel("client." + WebsocketHandler.echoHandler.socketId()).stopListening(".user.authorized");
        };
    });
    return (
        <div className="login-page min-h-screen min-w-full flex items-center justify-center" style={{ backgroundColor: "#0f0f0f" }}>
            <div className="px-14 py-10 w-full max-w-md" style={{ backgroundColor: "#242424" }}>
                {currentDialog}
            </div>
        </div>
    );
}

function SelectLoginOptionDialog({ setCurrentDialog }: InferProps<typeof SelectLoginOptionDialog.propTypes>) {
    function LoginUsingBrowserOptionButtonClicked(){
        setCurrentDialog(<LoginUsingBrowserDialog setCurrentDialog={setCurrentDialog} />)
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
    setCurrentDialog: PropTypes.func.isRequired
}

function LoginUsingBrowserDialog({ setCurrentDialog }: InferProps<typeof LoginUsingBrowserDialog.propTypes>) {
    function CancelButtonClicked(){
        setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog}/>)
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
    setCurrentDialog: PropTypes.func.isRequired
}

function WaitUntilLoggedInDialog({ setCurrentDialog }: InferProps<typeof WaitUntilLoggedInDialog.propTypes>){
    return (
        <div className="dialog">
            <h1 className="text-lg font-semibold">Signing In.</h1>
            <p className="text-sm text-opacity-60 text-white mr-1">Please wait until you are signed in successfully.</p>
        </div>
    );
}
WaitUntilLoggedInDialog.propTypes = {
    setCurrentDialog: PropTypes.func.isRequired
}

export default LoginPage;