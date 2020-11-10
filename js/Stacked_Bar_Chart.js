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

	d3.csv("data/stacked_bar_chart_csv_3.csv", function (data) {
	  return {
		percentage: +data.percentage,
		regenType: data.regen_type,
		age: data.age,
		reImageTime: data.re_image_time,
		cutType: data.cut_type,
		genetics: data.genetics,
		col_name: data.col_name
	  };
	}).then(function (d) {
	  chart(d, "L2 cut, 12 h reimage", 1);
	  chart(d, "L2 cut, 24 h reimage", 2);
	  chart(d, "young adult cut, 24 h reimage", 3);
	});
	
	function fixData(data, age) {
	  newData = [];
	  for (i = 0; i < data.percentage; i++) {
		d = data[i];

		let temp = "";

		if (d.genetics == "wild-type") {
		  temp = temp + "wt ";
		} else if (d.genetics == "dlk-1") {
		  temp = temp + "dlk-1 ";
		}

		if (d.cutType == "axon") {
		  temp = temp + "axon";
		} else if (d.cutType == "a+d") {
		  temp = temp + "a+d";
		}
		d["category"] = temp;

		if (age == "L2 cut, 12 h reimage") {
		  if (d.age != "L2" || d.reImageTime == "12hr") {
			data.splice(i, 1);
		  }
		} else if (age == "L2 cut, 24 h reimage") {
		  if (d.age != "L2" || d.reImageTime == "24hr") {
			data.splice(i, 1);
		  }
		} else if (age == "young adult cut, 24 h reimage") {
		  if (d.age != "YA" || d.reImageTime == "24hr") {
			data.splice(i, 1);
		  }
		}
	  }

	  return data;
	}
	
	function swap(json){
	  var ret = {};
	  for(var key in json){
		ret[json[key]] = key;
	  }
	  return ret;
	}

	//construct a stacked bar chart
	function chart(data, age, step) {
		console.log("chart called");
	  //construct y axis
	  let y = d3.scaleLinear().domain([0, 100]).range([height, 500]);
	  svg.append("g").call(d3.axisLeft(y));
	  
	  let subgroups = ["none", "not to ring", "to ring", "along ring", "full length"];
	  
	  data = fixData(data, age);
	  
	  
	  let groups = ["wt axon", "wt a+d", "dlk-1 a+d"];
	  
	  let color = d3.scaleOrdinal()
		.domain(subgroups)
		.range(['#e41a1c','#377eb8','#4daf4a', 'purple', 'pink'])
		
	  let stackedData = d3.stack()
		.keys(subgroups)
		(swap(data))
	  
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
		.attr("transform", "translate(-16," + height + ")")
		.call(d3.axisBottom(x));

	  // add dots to the dot-plot
	  svg.append("g")
		.selectAll("g")
		// Enter in the stack data = loop key per key = group per group
		.data(stackedData)
		.enter().append("g")
		  .attr("fill", function(d) { return color(d.regenType); })
		  .selectAll("rect")
		  // enter a second time = loop subgroup per subgroup to add all rectangles
		  .data(function(d) { return d; })
		  .enter().append("rect")
			.attr("x", function(d) { return 50; })
			.attr("y", function(d) { return 50; })
			.attr("height", function(d) { return d.percentage; })
			.attr("width", 10);

	}
}
stacked_bar_chart();