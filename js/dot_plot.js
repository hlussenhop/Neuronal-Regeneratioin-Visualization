

function dot_plot_chart() {


	let dispatcher;


	/*
	  Promise.all([
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
		}),
		d3.csv("data/avg_stdev_data_csv.csv", function (data) {
		  return {
			reImageTime: data.re_image_time,
			genetics: data.genetics,
			cutType: data.cut_type,
			average: +data.average,
			stdev: +data.stdev,
			n: data.n,
			age: data.age,
		  };
		}),
	  ]).then(function ([d, b]) {
		dotPlot(d, b, "L2 cut, 12 h reimage", 1);
		dotPlot(d, b, "L2 cut, 24 h reimage", 2);
		dotPlot(d, b, "young adult cut, 24 h reimage", 3);
	  });
	  */

	function returned(data) {



		//let parseDate = d3.timeParse("%m/%d/%Y");



		/*
		dispatcher.on("selectionUpdated.test", function(arg1) {
			console.log("hello dispatch");
			console.log(arg1);
			//	console.log(arg2);
		})*/

		let margin = { top: 10, right: 30, bottom: 30, left: 100 },
			width = 650 - margin.left - margin.right,
			height = 510 - margin.top - margin.bottom;

		let ourBrush = null;

		let svg = d3
			.select("#dot_plot")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


		function dotPlot(data, age, step) {
			// modify datasets so they can be used with the dot plot
			data = fixData(data, age);
			//avgData = fixData(avgData, age);

			//construct a y axis
			let y = d3
				.scaleLinear()
				.domain([0, 100])
				.range([height - 20, 70]);
			svg.append("g").call(d3.axisLeft(y));

			//construct x axis
			let x = d3
				.scaleBand()
				.rangeRound([16 + (width / 3) * step - 170, (width / 3) * step])
				.padding(0.1)
				.domain(["wt axon", "wt a+d", "dlk-1 a+d"]);
			svg
				.append("g")
				.attr("transform", "translate(-16," + (height - 20) + ")")
				.call(d3.axisBottom(x));


			let selected
			// add dots to the dot-plot
			svg
				.selectAll(".bar")
				.data(data)
				.enter()
				.append("circle")
				.attr("r", 3)

				.attr("cx", function (d) {
					direction =
						(Math.round(Math.random()) * 2 - 1) *
						(6 * Math.floor(Math.random() * 3));
					return x(d.category) + 6 + direction;
				})
				.attr("cy", function (d) {
					return y(d.length);
				})
				.attr("class", function (d) {
					return d.compositeCategory + ' deselected';
				})
				// select dots and color them on mouseover
				.on("mouseover", highlightDot)
				// deselect dots and color black upon mouseout
				.on("mouseout", deselect);

			function deselect(d) {
				let dispatchString2 = Object.getOwnPropertyNames(dispatcher._)[1];
				dispatcher.call(dispatchString2, this, svg.selectAll('.selected').data());

				selected.attr("class", function (d) {
					return d.compositeCategory;
				}).attr("r", 3);

			}


			function highlightDot(d) {
				selected = d3.selectAll(document.getElementsByClassName(d3.select(this).attr("class")))
				console.log("we")
				selected.attr("class", function (d) {
					return d.compositeCategory + " regen" + d.regenType;
				}).attr("r", 4);
				//console.log(d3.select(this).attr("class"));

				d3.select(this).classed("selected", true);



				let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
				console.log(dispatchString);

				dispatcher.call(dispatchString, this, svg.selectAll('.selected').data());
			}

			let points = d3.selectAll("circle")

			selectableElements = points;

			svg.call(brush)

			function brush(g) {

				const brush = d3.brush()
					.on('start brush', highlight)
					.on('end', brushEnd)
					.extent([
						[-margin.left, -margin.bottom],
						[width + margin.right, height + margin.top]
					]);

				ourBrush = brush;

				g.call(brush)


				function highlight(event, d) {
					if (event.selection === null) return;
					const [
						[x0, y0],
						[x1, y1]
					] = event.selection;


					//console.log(x0)
					points.classed('deselected', function (d) {
						return !(x0 <= d3.select(this).attr('cx') && d3.select(this).attr('cx') <= x1 && y0 <= d3.select(this).attr('cy') && d3.select(this).attr('cy') <= y1)
					})

					points.classed('selected', function (d) {
						if (x0 <= d3.select(this).attr('cx') && d3.select(this).attr('cx') <= x1 && y0 <= d3.select(this).attr('cy') && d3.select(this).attr('cy') <= y1) {
							d3.select(this).classed(d.compositeCategory + " regen" + d.regenType, true) 
							
						}else if (!(x0 <= d3.select(this).attr('cx') && d3.select(this).attr('cx') <= x1 && y0 <= d3.select(this).attr('cy') && d3.select(this).attr('cy') <= y1)){
							d3.select(this).classed("regen1", false)
							d3.select(this).classed("regen2", false)
							d3.select(this).classed("regen3", false)
							d3.select(this).classed("regen4", false)
							d3.select(this).classed("regen5", false)
						}
						
					});

					// do dispatch stuff


				}

				function brushEnd(event, d) {
					if (event.sourceEvent !== undefined && event.sourceEvent.type != 'end') {
						d3.select(this).call(brush.move, null);
					}
				}

			}



			//Add vertical bars to the dot plot
			//A bar is centered on the average length of the dots, and has a length of twice the standard deviation of the length of the dots
			/*
			svg
			  .selectAll(".bar")
			  .data(avgData)
			  .enter()
			  .append("line")
			  .attr("x1", function (d) {
				return x(d.category) + 6;
			  })
			  .attr("x2", function (d) {
				return x(d.category) + 6;
			  })
			  .attr("y1", function (d) {
				return y(d.average - d.stdev);
			  })
			  .attr("y2", function (d) {
				return y(d.average + d.stdev);
			  })
			  .attr("style", "stroke:rgb(80,80,80);stroke-width:2");
	
			// add a horizontal bar to the data
			// shows the location of the average length of the dots and makes the data more readable
			svg
			  .selectAll(".bar")
			  .data(avgData)
			  .enter()
			  .append("line")
			  .attr("x1", function (d) {
				return x(d.category) - 12;
			  })
			  .attr("x2", function (d) {
				return x(d.category) + 24;
			  })
			  .attr("y1", function (d) {
				return y(d.average);
			  })
			  .attr("y2", function (d) {
				return y(d.average);
			  })
			  .attr("style", "stroke:rgb(80,80,80);stroke-width:2");
	
			*/
			// add the text/labels in the
			svg
				.append("text")
				.attr("x", -5)
				.attr("y", 10)
				.attr("class", "chartText")
				.text(
					"Dendrite Cuts on Axon Regeneration in Wild Type (wt) and DLK-1 Mutants"
				);

			svg
				.append("text")
				.attr("x", 160)
				.attr("y", 495)
				.attr("class", "chartText")
				.text("Experimental Conditions");

			svg.append("text").attr("x", 20).attr("y", 50).attr("class", "chartText").text("L2 cut, 12 reimage");

			svg.append("text").attr("x", 200).attr("y", 50).attr("class", "chartText").text("L2 cut, 24 reimage");

			svg
				.append("text")
				.attr("x", 370)
				.attr("y", 50)
				.attr("class", "chartText")
				.text("Young Adult cut, 24 reimage");

			svg
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", -350)
				.attr("y", -30)
				.attr("class", "chartText")
				.text("Length Regenerated (um)");

			fixCircles();
		}

		// adds a 'category' column to the data which is used to match the data to its categorical data channel
		// filters data based on the age and reimaging time of the particular datapoint
		function fixData(data, age) {
			newData = [];
			for (i = 0; i < data.length; i++) {
				d = data[i];

				let temp = "";
				if (d != undefined) {
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

					d["compositeCategory"] = d.category.replace(/\s/g, '') + "" + d.age + d.reImageTime;

					if (age == "L2 cut, 12 h reimage") {
						console.log("g");
						if (d.age == "L2" && d.reImageTime == "12hr") {
							newData.push(d);
						}
					} else if (age == "L2 cut, 24 h reimage") {
						if (d.age == "L2" && d.reImageTime == "24hr") {
							newData.push(d);
						}
					} else if (age == "young adult cut, 24 h reimage") {
						if (d.age == "YA" && d.reImageTime == "24hr") {
							newData.push(d);
						}
					}
				}
			}

			return newData;
		}

		// removes and extra circles that are plotted wrong
		function fixCircles() {
			arr = Array.from(document.getElementsByTagName("circle"));

			for (i = 0; i < arr.length; i++) {
				if (arr[i].cx.baseVal.value == 0) {
					arr[i].remove();
				}
			}
		}


		dotPlot(data, "L2 cut, 12 h reimage", 1);
		dotPlot(data, "L2 cut, 24 h reimage", 2);
		dotPlot(data, "young adult cut, 24 h reimage", 3);



		return returned;
	}

	//construct a dot plot

	// Gets or sets the dispatcher we use for selection events
	returned.selectionDispatcher = function (_) {
		console.log("selection dispatcher dot");
		if (!arguments.length) return dispatcher;
		dispatcher = _;
		return returned;
	};


	return returned;
}



