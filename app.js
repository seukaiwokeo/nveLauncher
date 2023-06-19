const { app, BrowserWindow, ipcMain, shell } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        frame: false,
        resizable: true,
    });

    win.loadFile('app/index.html');

    ipcMain.on('minimize-window', () => {
        win.minimize();
    });

    ipcMain.on('maximize-window', () => {
        win.maximize();
    });

    ipcMain.on('restore-window', () => {
        win.unmaximize();
    });

    ipcMain.on('close-window', () => {
        app.quit();
    });

    ipcMain.on('get-window-status', (event) => {
        event.returnValue = win.isMaximized();
    });

    win.on('maximize', () => {
        win.webContents.send('window-status', true);
    });

    win.on('unmaximize', () => {
        win.webContents.send('window-status', false);
    });

    win.webContents.openDevTools();


    win.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url); // Open URL in user's browser.
        return { action: "deny" }; // Prevent the app from opening the URL.
    })
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
