function stacked_bar_chart() {
	let parseDate = d3.timeParse("%m/%d/%Y");

	let margin = { top: 10, right: 30, bottom: 30, left: 60 },
	  width = 650 - margin.left - margin.right,
	  height = 1000 - margin.top - margin.bottom;

	let svg = d3
	  .select("#dot_plot")
	  .append("svg")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("data/dot_plot_data_csv.csv", function (data) {
	  return {
		date: parseDate(data.date),
		index: data.index,
		side: data.side,
		length: +data.length,
		regenType: data.regen_type,
		age: data.age,
		reImageTime: data.re_image_time,
		cutType: data.cut_type,
		genetics: data.genetics,
	  };
	}).then(function (d) {
	  chart(d, "L2 cut, 12 h reimage", 1);
	  chart(d, "L2 cut, 24 h reimage", 2);
	  chart(d, "young adult cut, 24 h reimage", 3);
	});

	//construct a stacked bar chart
	function chart(data, age, step) {
		console.log("chart called");
	  //construct y axis
	  let y = d3.scaleLinear().domain([0, 100]).range([height, 500]);
	  svg.append("g").call(d3.axisLeft(y));
	  
	  //construct x axis
	  let x = d3
		.scaleBand()
		.rangeRound([16 + (width / 3) * step - 170, (width / 3) * step])
		.padding(0.1)
		.domain(["wt axon", "wt a+d", "dlk-1 a+d"]);
	  svg
		.append("g")
		.attr("transform", "translate(-16," + height + ")")
		.call(d3.axisBottom(x));

	  // add dots to the dot-plot

	}
}
stacked_bar_chart();