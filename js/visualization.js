
//import stacked_bar_chart from "Stacked_Bar_Chart.js"
// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {
  
  let parseDate = d3.timeParse("%m/%d/%Y");

  console.log('Hello, world!');
  
  d3.csv("data/dot_plot_merge_stacked_bar.csv", function(data) {
	  
	  
	return {
		  
		reImageTimeBar: data.re_image_time_class,
		col_name: data.col_name,
		none: data.none,
		not_to_ring: data.not_to_ring,
		to_ring: data.to_ring,
		along_ring: data.along_ring,
		full_length: data.full_length,
		
		
        date: parseDate(data.date),
        index: data.index,
        side: data.side,
        length: +data.length,
        regenType: data.regen_type,
        age: data.age,
        reImageTime: data.re_image_time,
        cutType: data.cut_type,
        genetics: data.genetics,
		
		ageBar: data.age_bar,
        reImageTimeBar2: data.re_image_time_bar,
        cutTypeBar: data.cut_type_bar,
        geneticsBar: data.genetics_bar
      };
	}
  ).then(function(d) {
	  	
		let dotPlot = dot_plot_chart()
			.selectionDispatcher(d3.dispatch("updateSelection", "end"))
		    (d);
	  
		let stacked1 = stacked_bar_chart()
			.selectionDispatcher(d3.dispatch("updateSelection", "end"))
		    (d);
		
			
		
		dotPlot.selectionDispatcher()
			.on("updateSelection.test2", function(x) {
				console.log("hello dispatch good");
				console.log(x[0]);
				
				stacked1.highlightBar(x[0]);
			})
			
		dotPlot.selectionDispatcher()
			.on("end.test3", function(x) {
				console.log("deselected");
				console.log(x[0]);
				stacked1.deselectBar(x[0]);
			})
	
	
		stacked1.selectionDispatcher()
			.on("updateSelection.test", function(x) {
				console.log("stacked receives dispatch");
		
			
			
			//stacked1.highlightBar(x);
				})
  });
  


  
  

})());