function chart() {
  let parseDate = d3.timeParse("%m/%d/%Y");

  let margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 650 - margin.left - margin.right,
    height = 510 - margin.top - margin.bottom;

  let svg = d3
    .select("#dot_plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

  //construct a dot plot
  function dotPlot(data, avgData, age, step) {
    //construct y axis

    data = fixData(data, age);

    avgData = fixData(avgData, age);

    //data = getDataCategories(data);
    //data = getDataFromAge(data, age);
    //avgData = getDataCategories(avgData);
    //avgData = getDataFromAge(avgData, age);

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

    svg
      .append("line")
      .attr("x1", 23)
      .attr("x2", 214)
      .attr("y1", 243)
      .attr("y2", 234);

    svg
      .append("text")
      .attr("x", -5)
      .attr("y", 10)
      .text(
        "Dendrite Cuts on Axon Regeneration in Wild Type (wt) and DLK-1 Mutants"
      );

    svg
      .append("text")
      .attr("x", 190)
      .attr("y", 495)
      .text("Experimental Conditions");

    svg.append("text").attr("x", 20).attr("y", 50).text("L2 cut, 12 reimage");

    svg.append("text").attr("x", 200).attr("y", 50).text("L2 cut, 24 reimage");

    svg
      .append("text")
      .attr("x", 380)
      .attr("y", 50)
      .text("Young Adult cut, 24 reimage");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -350)
      .attr("y", -30)
      .text("Length Regenerated (um)");

    fixCircles();
  }
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

        if (age == "L2 cut, 12 h reimage") {
          console.log("g")
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
    //console.log(age)
    //console.log(data)
    return newData;
  }

  function getStd() {}
  /*
  // adjust the dataset
  function getDataCategories(data) {
    newData = [];
    for (i = 0; i < data.length; i++) {
      d = data[i];

      let temp = "";

      if (d.genetics == "wild-type" || d.genetics == "wt") {
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
    }
    console.log(data)
    return data;
  }

  function getDataFromAge(data, age) {
    for (i = 0; i < data.length; i++) {
      d = data[i];

      if (age == "L2 cut, 12 h reimage") {
        if (d.age != "L2"  || d.reImageTime != "12hr") {
          data.splice(i, 1);
        }
      } else if (age == "L2 cut, 24 h reimage") {
        if (d.age != "L2" || d.reImageTime != "24hr") {
          data.splice(i, 1);
        }
      } else if (age == "young adult cut, 24 h reimage") {
        if (d.age != "YA" || d.reImageTime != "24hr") {
          data.splice(i, 1);
        }
      }
    }

    return data;
  }
*/
  function fixCircles() {
    arr = Array.from(document.getElementsByTagName("circle"));

    for (i = 0; i < arr.length; i++) {
      if (arr[i].cx.baseVal.value == 0) {
        arr[i].remove();
      }
    }
  }
}
chart();

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
