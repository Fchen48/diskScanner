const electron = require("electron");
const dt = require("directory-tree");
const sunburst = require("sunburst-chart");
setTimeout(() => {
    const root = dt(".", null, null);


    const sb = sunburst()
    .data(root)
    .size("size")
    .minSliceAngle(2.3)
    .sort((a, b) => b.size - a.size)
    .showLabels(true)
    .tooltipContent(element => element.name + "\n" + element.size)(document.getElementById("sunburst"));

}, 500);