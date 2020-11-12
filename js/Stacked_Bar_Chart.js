function stacked_bar_chart() {
	let parseDate = d3.timeParse("%m/%d/%Y");

	let margin = { top: 50, right: 30, bottom: 30, left: 100 },
	  width = 650 - margin.left - margin.right,
	  height = 1000 - margin.top - margin.bottom;

	let svg = d3
	  .select("#dot_plot")
	  .append("svg")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("data/stacked_2a.csv", function (data) {
	  return {
		reImageTime: data.re_image_time,

		col_name: data.col_name,
		none: data.none,
		not_to_ring: data.not_to_ring,
		to_ring: data.to_ring,
		along_ring: data.along_ring,
		full_length: data.full_length
	  };
	}).then(function (d) {
	  chart(d, "12hr", 1);
	  chart(d, "24hr", 2);
	  chart(d, "24hr_YA", 3);
	});
	
	function divideByReimage(reImageTime) {
		function returned(d) {
			return (d.reImageTime == reImageTime)
				
			
		}
		return returned;
	}
	

	//construct a stacked bar chart
	function chart(data, age, step) {
		console.log("chart called");
	  //construct y axis
	  
	  console.log(data);
	  
	  data = data.filter(divideByReimage(age));
	  
	  console.log(data);
	  
	  let y = d3.scaleLinear().domain([0, 100]).range([height, 500]);
	  //svg.append("g").call(d3.axisLeft(y));
	  
	  
	  let y1 = d3.scaleLinear()
		.domain([0, 1])
		.range([ height-60, 500 ]);
		
		
	  svg.append("g").call(d3.axisLeft(y1).tickFormat(d3.format('~%')));
	  
	  svg.append("text")
		.attr("x", 150)
		.attr("y", 900)
		.text("Experimental Conditions");
		
	  svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -775)
		.attr("y", -40)
		.text("Percent Regeneration");
		
	  svg.append("text")
		.attr("x", 40)
		.attr("y", 490)
		.text("Neuronal Percent Regeneration by Regeneration Type");
	  
	  
	  let subgroups = ["none", "not_to_ring", "to_ring", "along_ring", "full_length"];
	  
	  //data = fixData(data, age);
	  
	  
	  let groups = ["wt axon", "wt a+d", "dlk-1 a+d"];
	  
	  let x1 = d3.scaleBand()
		  .domain(groups)
		  .range([(step-1)*(width/3) + 5, (step)*(width/3)])
		  .padding([0.2])
	  
		  
	  
	  let color = d3.scaleOrdinal()
		.domain(subgroups)
		.range(['purple','blue','green', 'yellow', 'red'])
		
	  let stackedData = d3.stack()
		.keys(subgroups)
		(data)
	  
	  console.log(stackedData);
	  
	  
	  //console.log(groups);
	  
	  //construct x axis
	  let x = d3
		.scaleBand()
		.rangeRound([16 + (width / 3) * step - 170, (width / 3) * step])
		.padding(0.1)
		.domain(["wt axon", "wt a+d", "dlk-1 a+d"]);
	  
	  svg
		.append("g")
		.attr("transform", "translate(-16," + (height-60) + ")")
		.call(d3.axisBottom(x));

	  // add dots to the dot-plot
	  svg.append("g")
		svg.append("g")
		.selectAll("g")
		// Enter in the stack data = loop key per key = group per group
		.data(stackedData)
		.enter().append("g")
		  .attr("fill", function(d) { return color(d.key); })
		  .selectAll("rect")
		  // enter a second time = loop subgroup per subgroup to add all rectangles
		  .data(function(d) { return d; })
		  .enter().append("rect")
			.attr("x", function(d) { return x1(d.data.col_name); })
			.attr("y", function(d) { return y1(d[1]); })
			.attr("height", function(d) { return y1(d[0]) - y1(d[1]); })
			.attr("width",40)
			.style("stroke", "black")

	}
}
stacked_bar_chart();