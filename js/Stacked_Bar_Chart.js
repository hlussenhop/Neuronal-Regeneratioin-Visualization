// stacked bar chart function

//var dispatcher = d3.dispatch("selectionUpdated");

function stacked_bar_chart() {

	// margins
	

	// reading csv file
	
	/*
	d3.csv("data/dot_plot_merge_stacked_bar.csv", function (data) {
	  return {
		
		reImageTimeBar: data.re_image_time_class,

		col_name: data.col_name,
		none: data.none,
		not_to_ring: data.not_to_ring,
		to_ring: data.to_ring,
		along_ring: data.along_ring,
		full_length: data.full_length
		
		
	  };
	  // call the chart function 3 times
	}).then(function (d) {
	  chart(d, "12hr", 1);
	  chart(d, "24hr", 2);
	  chart(d, "24hr_YA", 3);
	});
	*/
	
	let dispatcher;
	
	
	function returned(data) {
		
	  //let dispatcher = d3.dispatch("selectionUpdated");
		
	  console.log("returned begins");
	  
	  
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
		
		
	  chart(data, "12hr", 1);
	  chart(data, "24hr", 2);
	  chart(data, "24hr_YA", 3);
	  
	  
	  // defines function to filter data based on reimage time
	function divideByReimage(reImageTimeBar) {
		function returned(d) {
			return (d.reImageTimeBar == reImageTimeBar)	
		}
		return returned;
	}
	

		//construct a stacked bar chart
		function chart(data, age, step) {
		  
		  //console.log("chart called");
		  //console.log(data);
		  console.log("data here:");
		  console.log(data);
		  
		  // filter the data
		  data = data.filter(divideByReimage(age));
		  
		  // console.log(data);
		  
		  // define domain and range of the y axis
		  let y1 = d3.scaleLinear()
			.domain([0, 1])
			.range([ height-60, 500 ]);
			
		  // create y axis to dispay percentage
		  svg.append("g").call(d3.axisLeft(y1).tickFormat(d3.format('~%')));
		  
		  // chart labels
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
		  
		  
		  // defines the subgroups within the stacked bar chart (type of regeneration)
		  let subgroups = ["none", "not_to_ring", "to_ring", "along_ring", "full_length"];
		  
		  // group stacked bar charts by experimental condition
		  let groups = ["wt axon", "wt a+d", "dlk-1 a+d"];
		  
		  // defines the domain and range of the x axis, used to scale the bars
		  let x1 = d3.scaleBand()
			  .domain(groups)
			  .range([(step-1)*(width/3) + 5, (step)*(width/3)])
			  .padding([0.2])
		  
			  
		  // define the colors of the bar charts
		  let color = d3.scaleOrdinal()
			.domain(subgroups)
			.range(['purple','blue','green', 'yellow', 'red'])
			
		  // create stacks based on the subgroups
		  let stackedData = d3.stack()
			.keys(subgroups)
			(data)
		  
		  //console.log(stackedData);

		  // define the scope of the x axis
		  let x = d3
			.scaleBand()
			.rangeRound([16 + (width / 3) * step - 170, (width / 3) * step])
			.padding(0.1)
			.domain(["wt axon", "wt a+d", "dlk-1 a+d"]);
		  
		  // add the x axis to the svg
		  svg
			.append("g")
			.attr("transform", "translate(-16," + (height-60) + ")")
			.call(d3.axisBottom(x));

		  // add bars to the stacked bar chart
		  svg.append("g")
			svg.append("g")
			.selectAll("g")
			.data(stackedData)
			.enter().append("g")
			  .attr("fill", function(d) { return color(d.key); })
			  .attr("class", function(d) { return color(d.key); })
			  .selectAll("rect")
			  .data(function(d) { return d; })
			  .enter().append("rect")
				.attr("x", function(d) { return x1(d.data.col_name); })
				.attr("y", function(d) { return y1(d[1]); })
				.attr("height", function(d) { return y1(d[0]) - y1(d[1]); })
				.attr("width",40)
				.style("stroke", "black")
				.attr("class", classify)
				.on("mouseover", highlight)
				// deselect dots and color black upon mouseou)t
				.on("mouseout", function (d) {
				  d3.select(this).classed("selected", false) 
					
				});
				
		  function highlight(d) {

			d3.select(this).classed("selected", true)
			
			data1 = d3.select(this).data()[0];
			
			let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
			dispatcher.call(dispatchString, this, data1);
			console.log("bar highlighted");
			console.log(dispatchString);
			
			
			//dispatcher.call(d

		  }
		  
		  function classify(d) {
			  console.log("classify");
			  console.log(d);


			  return d.data.ageBar + d.data.reImageTimeBar2 + d.data.cutTypeBar + d.data.geneticsBar
		  }
		  
		  
		  
		  

		}
	  
	  
	  return returned;
		
	}
	
	// Gets or sets the dispatcher we use for selection events
	returned.selectionDispatcher = function (_) {
		console.log("s dipatcher bar");
		if (!arguments.length) return dispatcher;
		dispatcher = _;
		return returned;
	};
	
	returned.highlightBar = function(data) {
		
	}
	
	returned.highlightBar = function(x) {
			
			name = x.age + x.reImageTime + x.cutType + x.genetics
			console.log("name here:");
			console.log(name);
			
			d3.selectAll(document.getElementsByClassName(name)).classed("selected", true);
			
			//d3.select(name).classed("selected", true);
		return returned;
	}
	
	
	
	return returned;
}
// call the function we created
  //stacked_bar_chart();
