import Store from "electron-store";
import { ipcMain } from 'electron';

export default class LauncherConfigHandler {
    private static initDone = false;
    private static store: Store<ConfigSchema>;
    private static logPrefix = "[LauncherConfigHandler] ";
    static Init() {
        if (this.initDone) {
            return;
        }

        this.store = new Store<ConfigSchema>();

        console.log(this.logPrefix + "Current config path: " + this.store.path);

        ipcMain.on('get-launcher-config-value', (event, arg: { key: string }) => {
            if (!this.initDone) {
                console.error(this.logPrefix + "Trying to get key (" + arg.key + ") before init.");
                return;
            }
            if (!this.store.has(arg.key)) {
                console.error(this.logPrefix + "Trying to get a non-existing key (" + arg.key + ")");
                return;
            }
            const val = this.store.get(arg.key);
            console.debug(this.logPrefix + "Key: " + arg.key + "| Value: " + val);
            event.returnValue = val;
        });

        ipcMain.on('set-launcher-config-value', (event, arg: { key: string, value: any }) => {
            if (!this.initDone) {
                console.error(this.logPrefix + "Trying to set key (" + arg.key + ") before init.");
                event.returnValue = false;
                return;
            }
            
            this.store.set(arg.key, arg.value);
            console.debug(this.logPrefix + "Updated value: Key: " + arg.key + " | Value: " + arg.value);
            event.returnValue = true;
        });

        this.initDone = true;
    }
}

interface ConfigSchema {
    authToken: string;
}