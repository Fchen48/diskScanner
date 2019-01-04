const d3 = require("d3");

const data = [
    { width: 200,
        height: 100,
        fill: "green" },
    { width: 100,
        height: 70,
        fill: "blue" },
    { width: 130,
        height: 30,
        fill: "red" },

];

const svg = d3.select("#sunburst");
svg.append("g")
.selectAll("g")
.data(data)
.enter()
.append("rect")
.attr("width", d => d.width)
.attr("height", d => d.height)
.attr("fill", d => d.fill);