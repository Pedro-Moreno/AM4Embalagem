const { app, BrowserWindow, shell, Menu} = require('electron')
const { join } = require('path')

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win = null

async function createWindow () {
  win = new BrowserWindow({
    title: 'Main window',
    width: 500,
    height: 600,
    resizable: false,
    maximizable: false,
    webPreferences: {
      preload: join(__dirname, '../electron/preload.js'),
      nodeIntegration: true,
      devTools: true,
    }
  })
  
  Menu.setApplicationMenu(null);

  if (app.isPackaged) {
    // win.removeMenu()
    win.loadFile(join(__dirname, '../dist/index.html'))
  } else {
    // Vite's dev server
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})