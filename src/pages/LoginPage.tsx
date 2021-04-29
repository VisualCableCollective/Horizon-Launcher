import Config from "../Config";

function LoginPage() {
    let loginURL = Config.getAPIServerURL();
    return (
        <div className="login-page min-h-screen min-w-full flex items-center justify-center" style={{ backgroundColor: "#0f0f0f" }}>
            <div className="p-10 w-full max-w-md" style={{ backgroundColor: "#242424" }}>
                <h1 className="text-lg font-semibold">Sign In To Your Horizon Account</h1>
                <div className="mt-4 grid gap-3">
                    <button className="px-5 py-3 w-full bg-opacity-60 hover:bg-opacity-80 focus:bg-opacity-100 outline-none focus:outline-none bg-button-1 rounded-sm transition-all duration-100">
                        Sign in using your browser
                    </button>
                    <button className="px-5 py-3 w-full bg-opacity-60 cursor-not-allowed	 outline-none focus:outline-none bg-button-1 disabled:opacity-50 rounded-sm transition-all duration-100" disabled>
                        Sign in using the Horizon app
                    </button>
                </div>
                <p className="font-bold">Don't have an Horizon account yet?</p>
                <button>Sign Up</button>
            </div>
        </div>
    );
}

export default LoginPage;