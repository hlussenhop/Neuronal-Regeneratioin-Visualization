// stacked bar chart function
function stacked_bar_chart() {

	let dispatcher;
	function returned(data) {


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

			// filter the data
			data = data.filter(divideByReimage(age));

			// define domain and range of the y axis
			let y1 = d3.scaleLinear()
				.domain([0, 1])
				.range([height - 60, 500]);

			// create y axis to dispay percentage
			svg.append("g").call(d3.axisLeft(y1).tickFormat(d3.format('~%')))
				.style("font-size", "12px")
				

			// chart labels
			svg.append("text")
				.attr("x", 150)
				.attr("y", 900)
				.text("Experimental Conditions");

			svg.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", -775)
				.attr("y", -50)
				.text("Percent Regeneration");

			svg.append("text")
				.attr("x", 40)
				.attr("y", 490)
				.text("Neuronal Percent Regeneration by Regeneration Type")
				.attr('font-weight', 'bold');


			// defines the subgroups within the stacked bar chart (type of regeneration)
			let subgroups = ["none", "not_to_ring", "to_ring", "along_ring", "full_length"];

			// group stacked bar charts by experimental condition
			let groups = ["wt axon", "wt a+d", "dlk-1 a+d"];

			// defines the domain and range of the x axis, used to scale the bars
			let x1 = d3.scaleBand()
				.domain(groups)
				.range([(step - 1) * (width / 3) + 5, (step) * (width / 3)])
				.padding([0.2])


			// define the colors of the bar charts
			let color = d3.scaleOrdinal()
				.domain(subgroups)
				.range(['purple', 'blue', 'green', 'yellow', 'red'])

			// create stacks based on the subgroups
			let stackedData = d3.stack()
				.keys(subgroups)
				(data)


			// define the scope of the x axis
			let x = d3
				.scaleBand()
				.rangeRound([24 + (width / 3) * step - 170, ((width + 10) / 3) * step])
				.padding(0.1)
				.domain(["wt axon", "wt a+d", "dlk-1 a+d"]);

			// add the x axis to the svg
			svg
				.append("g")
				.attr("transform", "translate(-16," + (height - 60) + ")")
				.call(d3.axisBottom(x))
				.style("font-size", "12px")
				.attr('font-weight', 'bold');

				svg
					.selectAll(".bar")
					.data(data)
					.enter()
					.append("rect")
					.attr("x", function(d){
						return x(d.col_name) - 15
					})
					.attr("y", height - 53)
					.attr("width", 45)
					.attr("height", 10)
					.attr("opacity", 0)
					.attr("id", function(d){
					})

			// add bars to the stacked bar chart
			
			svg.append("g")
			
			let bars = svg.append("g")
				.selectAll("g")
				.data(stackedData)
				.enter().append("g")
				.attr("fill", barColor)
				.attr("class", barColor)
				.selectAll("rect")
				.data(function (d) {
					return d;
				})
				.enter().append("rect")
				.attr("x", function (d) {
					return x1(d.data.col_name);
				})
				.attr("y", function (d) { return y1(d[1]); })
				.attr("height", function (d) { return y1(d[0]) - y1(d[1]); })
				.attr("width", 40)
				.style("stroke", "black")
				.attr("class", classify)
				.on("mouseover", highlight)
				// deselect bars and delete text
				.on("mouseout", function (d) {
					d3.select(this).classed("selected_bar", false)
					d3.selectAll(document.getElementsByClassName("pct_text")).remove()
					let dispatchString = Object.getOwnPropertyNames(dispatcher._)[4];
					dispatcher.call(dispatchString, this, data1);
				});

			fillColor;

			//Highlight a bar and add text upon mouseover
			function highlight(d) {
				d3.select(this).classed("selected_bar", true)
				y1 = d3.select(this).data()[0][0]
				y2 = d3.select(this).data()[0][1]
				percent = ((y2 - y1) * 100).toFixed(0)

				svg.append("text")
					.attr("x", parseInt(d3.select(this).attr("x"), 10) + 5)
					.attr("y", parseInt(d3.select(this).attr("y"), 10) + (parseInt(d3.select(this).attr("height"), 10) / 2))
					.style("font-size", "15px")
					.attr("class", "pct_text")
					.text(percent + "%")

				data1 = d3.select(this).data()[0];

				let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
				dispatcher.call(dispatchString, this, data1);
			}

			//Select the color of the bar
			function barColor(d) {
				fillColor = color(d.key);
				return color(d.key);
			}

			//Get the class of the bar
			function classify(d) {
				return d.data.ageBar + d.data.reImageTimeBar2 + d.data.cutTypeBar + d.data.geneticsBar
			}
		}

		

		return returned;
	}

	// Gets or sets the dispatcher we use for selection events
	returned.selectionDispatcher = function (_) {
		if (!arguments.length) return dispatcher;
		dispatcher = _;
		return returned;
	};


	//Highlight bars when dots are brushed over
	returned.highlightBar = function (x) {
		name = x.age + x.reImageTime + x.cutType + x.genetics

		let thing = this

		d3.selectAll(document.getElementsByClassName(name))
			.style('opacity', 1);
			

		d3.select(d3.selectAll(document.getElementsByClassName(name))._groups[0][x.regenType]).classed("selected_bar", true)

		
		return returned;
	}

	//Deselect bars when dots are deselected with brushing
	
	returned.deselectBar = function (x) {
		name = x.age + x.reImageTime + x.cutType + x.genetics
		let thing1 = d3.select(d3.selectAll(document.getElementsByClassName(name)))
		d3.selectAll(document.getElementsByClassName(name)).style('opacity', function() {
			return (this === thing1) ? 0.5 : 1;
			})
		
			
		d3.select(d3.selectAll(document.getElementsByClassName(name))._groups[0][x.regenType]).classed("selected_bar", false)
		return returned;

	}
	

	return returned;
}

