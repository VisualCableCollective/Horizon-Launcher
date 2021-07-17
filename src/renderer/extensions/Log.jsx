// Modules
import electron from "electron";

const ipcRenderer = electron.ipcRenderer || false;

class Log {
    static silly(serviceLogName, message){
        ipcRenderer.send('log', { type: "SILLY", message: "[" + serviceLogName + "] " + message});
    }

    static debug(serviceLogName, message){
        ipcRenderer.send('log', { type: "DEBUG", message: "[" + serviceLogName + "] " + message});
    }

    static verbose(serviceLogName, message){
        ipcRenderer.send('log', { type: "VERBOSE", message: "[" + serviceLogName + "] " + message});
    }

    static info(serviceLogName, message){
        ipcRenderer.send('log', { type: "INFO", message: "[" + serviceLogName + "] " + message});
    }

    static warn(serviceLogName, message){
        ipcRenderer.send('log', { type: "WARN", message: "[" + serviceLogName + "] " + message});
    }

    static error(serviceLogName, message){
        ipcRenderer.send('log', { type: "ERROR", message: "[" + serviceLogName + "] " + message});
    }
}

export default Log;
