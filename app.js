const electron = require("electron");
const ElectronConfig = require("electron-config");
const config = new ElectronConfig();
const url = require("url");
const path = require("path");
const dt = require("directory-tree");
const pug = require("electron-pug");

let mainWindow;

electron.app.on("ready", () => {
    setTimeout(() => {
        pug({ pretty: true })
        .then(() => {
            const woptions = {
                show: false,
                frame: false,
                width: 800,
                height: 600,
                transparent: true,
                resizeable: true
            };
            Object.assign(woptions, config.get("window"));

            mainWindow = new electron.BrowserWindow(woptions);
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, "views", "index.pug"),
                protocol: "file:",
                slashes: true
            }));

            mainWindow.on("close", () => {
                config.set("window", mainWindow.getBounds());
            });

            mainWindow.on("closed", () => {
                electron.app.quit();
            });

            mainWindow.once("ready-to-show", () => {
                mainWindow.show();
                if(process.env.TERM_PROGRAM == "vscode") {
                    mainWindow.webContents.openDevTools();
                }
            });
        })
        .catch(console.error);
    }, 50);
});

electron.ipcMain.on("window:minimize", () => {
    const window = electron.BrowserWindow.getFocusedWindow();
    if(window.isMinimized()) {
        window.restore();
        return;
    }
    window.minimize();
});

// let i = 0;
// const root = dt(".", null, null, () => i++);
// console.log("Analyzed files: " + i);
// console.log(root);