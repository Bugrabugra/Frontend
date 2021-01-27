import {app} from "electron";
import {mainWindow} from "./electron-main";


const isMac = process.platform === 'darwin';

export const menuTemplate = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: "File",
    submenu: [
      {
        label: "Settings",
        accelerator: "CmdOrCtrl+,",
        click() {
          mainWindow.webContents.send("show-settings")
        }
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : [
    {
      label: "File",
      submenu: [
        {
          label: "Settings",
          accelerator: "CmdOrCtrl+,",
          click() {
            mainWindow.webContents.send("show-settings")
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }
  ]),
  // { role: 'fileMenu' }

  // { role: 'editMenu' }
  // {
  //   label: 'Edit',
  //   submenu: [
  //     { role: 'undo' },
  //     { role: 'redo' },
  //     { type: 'separator' },
  //     { role: 'cut' },
  //     { role: 'copy' },
  //     { role: 'paste' },
  //     ...(isMac ? [
  //       { role: 'pasteAndMatchStyle' },
  //       { role: 'delete' },
  //       { role: 'selectAll' },
  //       { type: 'separator' },
  //       {
  //         label: 'Speech',
  //         submenu: [
  //           { role: 'startspeaking' },
  //           { role: 'stopspeaking' }
  //         ]
  //       }
  //     ] : [
  //       { role: 'delete' },
  //       { type: 'separator' },
  //       { role: 'selectAll' }
  //     ])
  //   ]
  // },

  // { role: 'viewMenu' }

  // {
  //   label: 'View',
  //   submenu: [
  //     { role: 'reload' },
  //     { role: 'forcereload' },
  //     { role: 'toggledevtools' },
  //     { type: 'separator' },
  //     { role: 'resetzoom' },
  //     { role: 'zoomin' },
  //     { role: 'zoomout' },
  //     { type: 'separator' },
  //     { role: 'togglefullscreen' }
  //   ]
  // },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]
