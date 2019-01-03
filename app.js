const dt = require("directory-tree");

let i = 0;
process.stdout.clearLine();
const root = dt("/", null, null, (folder, path, stats) => {
    i++;
    process.stdout.cursorTo(0);
    process.stdout.write("Analyzed files: " + i);
});
console.log(root);