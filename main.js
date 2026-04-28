const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);