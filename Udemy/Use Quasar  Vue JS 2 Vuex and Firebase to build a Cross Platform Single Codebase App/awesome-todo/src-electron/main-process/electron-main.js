import { app, BrowserWindow, nativeTheme, Menu, ipcMain } from 'electron'
import {menuTemplate} from "./electron-main-menu-template";

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname
}


// Variables and constants
export let mainWindow

const menu = Menu.buildFromTemplate(menuTemplate);

// App ready
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 500,
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  Menu.setApplicationMenu(menu);
})

// App events
app.on('window-all-closed', () => {
  app.quit()
})

// IPC events
ipcMain.on("quit-app", () => {
  app.quit();

})


