const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) return app.quit();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1160,
    height: 435,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'resources', 'icon.png'),
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.setMenu(null);
};

app.on('ready', createWindow);
