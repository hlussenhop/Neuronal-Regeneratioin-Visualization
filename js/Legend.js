// Stacked Bar Chart Data

function legend() {
	let margin = {
	  top: 35,
	  left: 120 ,
	  right: 30,
	  bottom: 50
	},
	width = 500 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

	let svg_stack_bar = d3.select('#dot_plot')
	  .append('svg')
	  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of the page.
	  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
	  .style('background-color', 'white') // change the background color to white

	// Legend Data
	const legend_width = 150
	const legend_height = 200
	const legend_x = 700
	const legend_y = 400
	const y_incr = 20
	const x_incr = 10

	// legend outlined box
	svg_stack_bar.append("rect")
	  .attr("x",legend_x)
	  .attr("y",legend_y)
	  .attr("width",legend_width)
	  .attr("height", legend_height)
	  .style("fill", "white")
	  .style("stroke", 'black');

	// legend title
	svg_stack_bar.append("text")
	  .attr("x", ((legend_x + (legend_width)/2)))
	  .attr("y", (legend_y + x_incr))
	  .text("Regeneration Type")
	  .style("font-size", "12px")
	  .style('text-anchor', 'middle')
	  .attr('text-decoration', 'underline')
	  .attr('font-weight', 'bold')
	  .attr("alignment-baseline","middle")

	// legend: none regeneration SHAPE
	svg_stack_bar.append("circle")
	  .attr("cx",(legend_x + y_incr))
	  .attr("cy",(legend_y + (2*y_incr)))
	  .attr("r", 6)
	  .style("fill", "purple")
	  .style("stroke", 'black');

	// legend: none regeneration TEXT
	svg_stack_bar.append("text")
	  .attr("x", (legend_x + y_incr + x_incr))
	  .attr("y", (legend_y + (2*y_incr)))
	  .text("None")
	  .style("font-size", "10px")
	  .attr('font-weight', 'bold')
	  .attr("alignment-baseline","middle")

	// legend: not to ring regeneration SHAPE
	svg_stack_bar.append("circle")
	  .attr("cx",(legend_x + y_incr))
	  .attr("cy",(legend_y + (2*y_incr) + y_incr))
	  .attr("r", 6)
	  .style("fill", "blue")
	  .style("stroke", 'black');

	// legend: not to ring regeneration TEXT
	svg_stack_bar.append("text")
	  .attr("x", (legend_x + y_incr + x_incr))
	  .attr("y", (legend_y + (2*y_incr) + y_incr))
	  .text("Not to Ring")
	  .style("font-size", "10px")
	  .attr('font-weight', 'bold')
	  .attr("alignment-baseline","middle")

	// legend: to ring regeneration SHAPE
	svg_stack_bar.append("circle")
	.attr("cx",(legend_x + y_incr))
	.attr("cy",(legend_y + (2*y_incr) + y_incr + y_incr))
	.attr("r", 6)
	.style("fill", "green")
	.style("stroke", 'black');

	// legend: to ring regeneration TEXT
	svg_stack_bar.append("text")
	.attr("x", (legend_x + y_incr + x_incr))
	.attr("y", (legend_y + (2*y_incr) + y_incr + y_incr))
	.text("To Ring")
	.style("font-size", "10px")
	.attr('font-weight', 'bold')
	.attr("alignment-baseline","middle")

	// legend: along ring regeneration SHAPE
	svg_stack_bar.append("circle")
	  .attr("cx",(legend_x + y_incr))
	  .attr("cy",(legend_y + (2*y_incr) + y_incr + y_incr + y_incr))
	  .attr("r", 6)
	  .style("fill", "yellow")
	  .style("stroke", 'black');

	// legend: along ring regeneration TEXT
	svg_stack_bar.append("text")
	  .attr("x", (legend_x + y_incr + x_incr))
	  .attr("y", (legend_y + (2*y_incr) + y_incr + y_incr + y_incr))
	  .text("Along Ring")
	  .style("font-size", "10px")
	  .attr('font-weight', 'bold')
	  .attr("alignment-baseline","middle")

	// legend: full length regeneration SHAPE
	svg_stack_bar.append("circle")
	  .attr("cx",(legend_x + y_incr))
	  .attr("cy",(legend_y + (2*y_incr) + y_incr + y_incr + y_incr + y_incr))
	  .attr("r", 6)
	  .style("fill", "red")
	  .style("stroke", 'black');

	// legend: full length regeneration TEXT
	svg_stack_bar.append("text")
	  .attr("x", (legend_x + y_incr + x_incr))
	  .attr("y", (legend_y + (2*y_incr) + y_incr + y_incr + y_incr + y_incr))
	  .text("Full Length")
	  .style("font-size", "10px")
	  .attr('font-weight', 'bold')
	  .attr("alignment-baseline","middle")
	  
}
legend();