// Modules
const {ipcRenderer} = window.require("electron");


//replace with https://github.com/sindresorhus/electron-store instead?
class LauncherDataHandler{
    private static InitDone: boolean = false;
    private static dataFilePath: string =  "/Horizon Launcher/data.json";
    static Init(){
        if(this.InitDone){
            return;
        }

        ipcRenderer.sendSync("init-launcher-data-storage");

        this.InitDone = true;
    }
}

export default LauncherDataHandler;