import Config from "../Config";

function LoginPage(){
    let loginURL = Config.getAPIServerURL();
    return (
        <div className="login-page">
            <iframe title="Login" src="http://localhost:8000/auth/vcc/web-app/redirect"/>
        </div>
    );
}

export default LoginPage;