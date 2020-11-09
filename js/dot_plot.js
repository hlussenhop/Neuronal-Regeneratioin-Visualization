let parseDate = d3.timeParse("%m/%d/%Y");

let margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 650 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

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
  dotPlot(d, "L2 cut, 12 h reimage", 1);
  dotPlot(d, "L2 cut, 24 h reimage", 2);
  dotPlot(d, "young adult cut, 24 h reimage", 3);
});

//construct a dot plot
function dotPlot(data, age, step) {
  //construct y axis
  let y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));
  data = fixData(data, age);

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
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 3)
    .attr("class", "dot")
    .attr("cx", function (d) {
      direction =
        (Math.round(Math.random()) * 2 - 1) *
        (6 * Math.floor(Math.random() * 3));
      return x(d.category) + 6 + direction;
    })
    .attr("cy", function (d) {
      return y(d.length);
    });
}

// adjust the dataset
function fixData(data, age) {
  newData = [];
  for (i = 0; i < data.length; i++) {
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

/*
function setX(dot, dots, base) {
  dots = filterDots(dot, dots);
  //console.log(dots)
  //console.log(dots[i].cy.baseVal.value);
  direction = Math.floor(Math.random * 2);
  //console.log(direction);
  move = base;
  while(isOverlap(dot,dots,move)){
    if(direction = 0){
      move = move - 6;
    } else {
      move = move + 6;
    }
  }
  console.log(move)
  return move;
}

function isOverlap(dot, dots, move){
  for (i = 0; i < dots.length; i++){
    //console.log(dot.cx.baseVal.value)
    if(dots[i].cx.baseVal.value == 0){
      return false;
    }
    let distance = Math.sqrt((dots[i].cx.baseVal.value - dot.cx.baseVal.value + move)^2 +(dots[i].cx.baseVal.value - dot.cx.baseVal.value)^2);
    if(distance > 6){
      return true
    } 
  }
  return false;
}

function filterDots(dot, dots) {
  let temp = Array.prototype.slice.call(dots);
  //console.log(dot.age + "_" + dot.reImageTime+ "_" + dot.category + "_" + dot.length + "_circle")
  //console.log(temp[0].id)
  //console.log(dot)
  for (i = 0; i < temp.length; i++) {
    if (temp[i].id == dot.id) {
      temp.splice(i, 1);
    }
   
  }
  //
  //console.log(dot.cy)
  return temp;
}
*/
