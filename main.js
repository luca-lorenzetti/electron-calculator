const { app, BrowserWindow } = require('electron');

function createWindow () {
    const win = new BrowserWindow({
      width: 500,
      height: 800,
      autoHideMenuBar: true
    });
  
    win.loadFile('calculator.html')
  }

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') 
        app.quit();
});