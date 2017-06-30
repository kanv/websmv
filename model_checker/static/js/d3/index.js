import * as d3 from 'd3';

export function create() {
    const a = d3.select("circle");

    a.style("fill","orange")
        .attr("cx", 25)
        .attr("cy", 25)
        .attr("r", 10);
}
