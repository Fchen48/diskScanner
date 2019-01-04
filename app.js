const electron = require("electron");
const ElectronConfig = require("electron-config");
const config = new ElectronConfig();
const url = require("url");
const path = require("path");
const dt = require("directory-tree");

let mainWindow;

electron.app.on("ready", () => {
    setTimeout(() => {
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
            pathname: path.join(__dirname, "html", "index.html"),
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
        });
    }, 50);
});


// let i = 0;
// process.stdout.clearLine();
// const root = dt("/", null, null, (folder, path, stats) => {
//     i++;
//     process.stdout.cursorTo(0);
//     process.stdout.write("Analyzed files: " + i);
// });
// console.log(root);