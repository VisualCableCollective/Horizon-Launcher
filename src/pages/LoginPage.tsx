import { useRef } from "react";
import Config from "../Config";

function LoginPage(){
    let loginURL = Config.getAPIServerURL();
    let iFrame = useRef(null);
    return (
        <div className="login-page">
            <iframe ref={iFrame} title="Login" className="min-w-full min-h-screen" src={loginURL} onLoad={ () => {
                
            }} />
        </div>
    );
}

export default LoginPage;