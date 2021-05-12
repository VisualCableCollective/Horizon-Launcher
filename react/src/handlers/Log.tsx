// Modules
const { ipcRenderer } = window.require("electron");

class Log {
    static silly(serviceLogName: string, message: string){
        ipcRenderer.send('log', { type: "SILLY", message: "[" + serviceLogName + "] " + message});
    }

    static debug(serviceLogName: string, message: string){
        ipcRenderer.send('log', { type: "DEBUG", message: "[" + serviceLogName + "] " + message});
    }

    static verbose(serviceLogName: string, message: string){
        ipcRenderer.send('log', { type: "VERBOSE", message: "[" + serviceLogName + "] " + message});
    }

    static info(serviceLogName: string, message: string){
        ipcRenderer.send('log', { type: "INFO", message: "[" + serviceLogName + "] " + message});
    }

    static warn(serviceLogName: string, message: string){
        ipcRenderer.send('log', { type: "WARN", message: "[" + serviceLogName + "] " + message});
    }

    static error(serviceLogName: string, message: string){
        ipcRenderer.send('log', { type: "ERROR", message: "[" + serviceLogName + "] " + message});
    }
}

export default Log;