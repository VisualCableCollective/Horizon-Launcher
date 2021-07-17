// Custom Modules
import {HorizonAPIClient} from "horizon-api-client";

// Extensions
import Log from "../extensions/Log";

// Modules
import electron from "electron";

const ipcRenderer = electron.ipcRenderer || false;

export default class AuthHelper {
    async IsAuthTokenValid(callback) {
        let authTokenInStorage = ipcRenderer.sendSync('get-launcher-config-value', { key: "authToken" });
        if(!authTokenInStorage)
            return false;

        let isTokenValid = await HorizonAPIClient.authenticateUserWithToken(authTokenInStorage);
        if (isTokenValid) {
            Log.info("AuthTokenValidator", "Successfully validated the token");
            return true;
        } else {
            Log.error("AuthTokenValidator", "Token was invalid");
            return false;
        }
    }
}
