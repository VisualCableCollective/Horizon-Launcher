// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from 'electron';
import LauncherConfigHandler from "./handlers/LauncherConfigHandler";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    backgroundColor: "#171717",
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000')

  // ipc stuff

  // Background change
  ipcMain.on('change-window-background', (event, arg) => {
    console.debug("Received background change: '" + arg + "'");
    mainWindow.setBackgroundColor("#FFFFFF");
  });
  ipcMain.on('init', () => {
    console.debug("Starting init...");
    LauncherConfigHandler.Init();
    console.debug("Finished init!");
  });
  // Window Contols
  ipcMain.on('close-app', () => {
    if(mainWindow.isClosable()){
      mainWindow.close();
    }
  });
  ipcMain.on('minimize-app', () => {
    if(mainWindow.isMinimizable()){
      mainWindow.minimize();
    }
  });
  ipcMain.on('maximize-normalize-app', () => {
    if(mainWindow.isMaximized()){
      mainWindow.unmaximize();
    }else{
      if(mainWindow.isMaximizable){
        mainWindow.maximize();
      }
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.