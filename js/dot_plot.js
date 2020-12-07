function dot_plot_chart() {
  let dispatcher;

  function returned(data) {
    let margin = { top: 70, right: 60, bottom: 30, left: 100 },
      width = 690 - margin.left - margin.right,
      height = 520 - margin.top - margin.bottom;

    let ourBrush = null;

    let svg = d3
      .select("#dot_plot")
      .attr("class", "vis-svg")
      .append("svg")
      .attr("width", width + margin.left + margin.right + 50)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    function dotPlot(data, age, step) {
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
      }).then(function (d) {
        dotPlotShow(data, d, age, step);
      });
    }

    function dotPlotShow(data, stddata, age, step) {
      stddata = fixStdevData(stddata, age);
      // modify datasets so they can be used with the dot plot
      data = fixData(data, age);
      //avgData = fixData(avgData, age);

      //construct a y axis
      let y = d3
        .scaleLinear()
        .domain([0, 100])
        .range([height - 20, 70]);
      svg.append("g").call(d3.axisLeft(y)).style("font-size", "12px");

      //construct x axis
      let x = d3
        .scaleBand()
        .rangeRound([20 + (width / 3) * step - 170, (width / 3) * step])
        .padding(0.1)
        .domain(["wt axon", "wt a+d", "dlk-1 a+d"]);

      svg
        .append("g")
        .attr("transform", "translate(-16," + (height - 20) + ")")
        .call(d3.axisBottom(x))
        .style("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("class", "axisText");

      // ----------------------------------------
      // Statistic bars
      // Statistic bar: L2 cut, 12hr reimage
      svg
        .append("rect") // horizontal
        .attr("x", 10)
        .attr("y", 50)
        .attr("height", 1)
        .attr("width", 150)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("rect") // L tick
        .attr("x", 10)
        .attr("y", 50)
        .attr("height", 10)
        .attr("width", 2)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("rect") // R tick
        .attr("x", 160)
        .attr("y", 50)
        .attr("height", 10)
        .attr("width", 2)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("rect") // M tick
        .attr("x", 85)
        .attr("y", 50)
        .attr("height", 10)
        .attr("width", 2)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("text") // L (L **)
        .attr("x", 47.5 - 7)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");
      svg
        .append("text") // L (R **)
        .attr("x", 47.5 + 7)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");
      svg
        .append("text") // R (L **)
        .attr("x", 122.5 - 7)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");
      svg
        .append("text") // R (R **)
        .attr("x", 122.5 + 7)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");

      // Statistic bar: L2 cut, 24hr reimage
      svg
        .append("rect") // horizontal
        .attr("x", 188)
        .attr("y", 50)
        .attr("height", 1)
        .attr("width", 150)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("rect") // L tick
        .attr("x", 188)
        .attr("y", 50)
        .attr("height", 10)
        .attr("width", 2)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("rect") // R tick
        .attr("x", 338)
        .attr("y", 50)
        .attr("height", 10)
        .attr("width", 2)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("rect") // M tick
        .attr("x", 263)
        .attr("y", 50)
        .attr("height", 10)
        .attr("width", 2)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("text") // L *
        .attr("x", 225.5)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");
      svg
        .append("text") // R (L **)
        .attr("x", 300.5 - 7)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");
      svg
        .append("text") // R (R **)
        .attr("x", 300.5 + 7)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");

      // Statistic bar: YA cut, 24hr reimage
      svg
        .append("rect") // horizontal
        .attr("x", 364)
        .attr("y", 50)
        .attr("height", 1)
        .attr("width", 150)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("rect") // L tick
        .attr("x", 364)
        .attr("y", 50)
        .attr("height", 10)
        .attr("width", 2)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("rect") // R tick
        .attr("x", 514)
        .attr("y", 50)
        .attr("height", 10)
        .attr("width", 2)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("rect") // M tick
        .attr("x", 439)
        .attr("y", 50)
        .attr("height", 10)
        .attr("width", 2)
        .attr("fill", "black")
        .attr("class", "unselectable");
      svg
        .append("text") // L (L **)
        .attr("x", 401.5 - 7)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");
      svg
        .append("text") // L (R **)
        .attr("x", 401.5 + 7)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");
      svg
        .append("text") // R (L **)
        .attr("x", 476.5 - 7)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");
      svg
        .append("text") // R (R **)
        .attr("x", 476.5 + 7)
        .attr("y", 55)
        .text("*")
        .style("font-size", "30px")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("class", "chartText");
      // ---------------------------------------

      let selected;

      // add dots to the dot-plot
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 3.5)
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
          return d.compositeCategory + " deselected";
        });

      let points = d3.selectAll("circle");

      selectableElements = points;

      svg.call(brush);

      //function that facilitates brushing
      function brush(g) {
        const brush = d3
          .brush()
          .on("start brush", highlight)
          .on("end", brushEnd)
          .extent([
            [-margin.left, -margin.bottom],
            [width + margin.right, height + margin.top - 83],
          ]);

        ourBrush = brush;

        g.call(brush);

        //highlight or deselect dots when brushing occurs
        function highlight(event, d) {
          if (event.selection === null) return;
          const [[x0, y0], [x1, y1]] = event.selection;

          points.classed("deselected", function (d) {
            return !(
              x0 <= d3.select(this).attr("cx") &&
              d3.select(this).attr("cx") <= x1 &&
              y0 <= d3.select(this).attr("cy") &&
              d3.select(this).attr("cy") <= y1
            );
          });

          points.classed("selected", function (d) {
            if (
              x0 <= d3.select(this).attr("cx") &&
              d3.select(this).attr("cx") <= x1 &&
              y0 <= d3.select(this).attr("cy") &&
              d3.select(this).attr("cy") <= y1
            ) {
              d3.select(this).classed(
                d.compositeCategory + " regen" + d.regenType,
                true
              );
            } else if (
              !(
                x0 <= d3.select(this).attr("cx") &&
                d3.select(this).attr("cx") <= x1 &&
                y0 <= d3.select(this).attr("cy") &&
                d3.select(this).attr("cy") <= y1
              )
            ) {
              d3.select(this).classed("regen0", false);
              d3.select(this).classed("regen1", false);
              d3.select(this).classed("regen2", false);
              d3.select(this).classed("regen3", false);
              d3.select(this).classed("regen4", false);
            }

            return (
              x0 <= d3.select(this).attr("cx") &&
              d3.select(this).attr("cx") <= x1 &&
              y0 <= d3.select(this).attr("cy") &&
              d3.select(this).attr("cy") <= y1
            );
          });

          // do dispatch stuff

          let dispatchString = Object.getOwnPropertyNames(dispatcher._)[3];
          dispatcher.call(
            dispatchString,
            this,
            svg.selectAll(".deselected").data()
          );

          dispatchString = Object.getOwnPropertyNames(dispatcher._)[2];
          dispatcher.call(
            dispatchString,
            this,
            svg.selectAll(".selected").data()
          );
        }

        function brushEnd(event, d) {
          if (
            event.sourceEvent !== undefined &&
            event.sourceEvent.type != "end"
          ) {
            d3.select(this).call(brush.move, null);
          }
        }
      }

      //Add vertical bars to the dot plot
      //A bar is centered on the average length of the dots, and has a length of twice the standard deviation of the length of the dots

      // i = 0;

      //if (i == 0) {
      svg
        .selectAll(".bar")
        .data(stddata)
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
        .data(stddata)
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

      i++;
      //}

      // add the text/labels in the
      svg
        .append("text")
        .attr("x", -33)
        .attr("y", -40)
        .attr("class", "chartText")
        .text(
          "Dendrite Cuts on Axon Regeneration in Wild Type (wt) and DLK-1 Mutants"
        )
        .attr("font-weight", "bold");

      svg
        .append("text")
        .attr("x", 160)
        .attr("y", 440)
        .attr("class", "chartText")
        .text("Experimental Conditions");

      // column group labels
      svg
        .append("text")
        .attr("x", 30)
        .attr("y", 0)
        .attr("class", "chartText")
        .text("L2 cut,");

      svg
        .append("text")
        .attr("x", 40)
        .attr("y", 20)
        .attr("class", "chartText")
        .text("12 hr reimage");

      svg
        .append("text")
        .attr("x", 200)
        .attr("y", 0)
        .attr("class", "chartText")
        .text("L2 cut,");

      svg
        .append("text")
        .attr("x", 210)
        .attr("y", 20)
        .attr("class", "chartText")
        .text("24 hr reimage");

      svg
        .append("text")
        .attr("x", 370)
        .attr("y", 0)
        .attr("class", "chartText")
        .text("Young Adult cut,");

      svg
        .append("text")
        .attr("x", 380)
        .attr("y", 20)
        .attr("class", "chartText")
        .text("24 hr reimage");

      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -350)
        .attr("y", -50)
        .attr("class", "chartText")
        .text("Length Regenerated (um)");

      fixCircles();

      svg
        .append("rect")
        .attr("x", 1)
        .attr("y", 2)
        .attr("height", 30)
        .attr("width", 100)
        .attr("class", "tooltip_box")
        .attr("fill", "white")
        .attr("opacity", 0);

      svg
        .append("text")
        .attr("x", 1)
        .attr("y", 2)
        .attr("id", "tooltip_text")
        .attr("class", "tooltip_text")
        .attr("opacity", 0);

      svg
        .selectAll(".bar")
        .data(stddata)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.category) - 15;
        })
        .attr("y", height - 13)
        .attr("width", 45)
        .attr("height", 15)
        .attr("opacity", 0)
        .attr("id", function (d) {
          return d.stdev;
        })
        .on("mouseover", function (d, b) {
          text = "";
          width = 400;
          height = 0;
          x = this.x.baseVal.value;

          if (b.category == "wt axon") {
            if(step == 1){
              x = 30;
            } else if (step == 2) {
              x = 110;
            } else if (step == 3){
              x = 200
            }
            text = "Wild-type ASJ neuron, only axon is cut";
            width = 330;
          } else if (b.category == "wt a+d") {
            if(step == 1){
              x = 30;
            } else if (step == 2) {
              x = 70;
            } else if (step == 3){
              x = 110
            }
            text =
              "Wild-type ASJ neuron,\
            axon and dendrite are cut";

            width = 415;
          } else if (b.category == "dlk-1 a+d") {
            text =
              "DLK-1-independent ASJ neuron," +
              "\n" +
              "axon and dendrite are cut";
            x = 30;
            width = 490;
          }

          d3.selectAll(document.getElementsByClassName("tooltip_text"))
            .text(text)
            .attr("x", x)
            .attr("y", this.y.baseVal.value - 15)
            .attr("opacity", 1);

          d3.selectAll(document.getElementsByClassName("tooltip_box"))
            .attr("x", x - 5)
            .attr("y", this.y.baseVal.value - 35)
            .attr("width", width)
            .attr("opacity", 1);

          ///d3.select(this).attr("class","invis_box")
        })
        .on("mouseout", function (d, b) {
          d3.selectAll(document.getElementsByClassName("tooltip_box")).attr(
            "opacity",
            0
          );

          d3.selectAll(document.getElementsByClassName("tooltip_text")).attr(
            "opacity",
            0
          );

          
        })
        .on("mousedown", function (d) {})
        .on("mouseup", function (d) {
          
        });
    }

    // Adds a 'category' column to the data which is used to match the data to its categorical data channel
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

          d["compositeCategory"] =
            d.category.replace(/\s/g, "") + "" + d.age + d.reImageTime;

          if (age == "L2 cut, 12 h reimage") {
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

    function fixStdevData(data, age) {
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

    // Removes and extra circles that are plotted wrong
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

  //Highlight dots when bars are moused over
  returned.highlightDot = function (x, r) {
    genetics = x.data.geneticsBar;
    if (x.data.geneticsBar == "wild-type") {
      genetics = "wt";
    }
    
    compositeCategoryBar =
      genetics + x.data.cutTypeBar + x.data.ageBar + x.data.reImageTimeBar2;
    

    switch (r) {
      case "none":
        regen = 0;
        break;
      case "not_to_ring":
        regen = 1;
        break;
      case "to_ring":
        regen = 2;
        break;
      case "along_ring":
        regen = 3;
        break;
      case "full_length":
        regen = 4;
    }

    d3.selectAll(document.getElementsByClassName(compositeCategoryBar)).classed(
      "regen" + regen,
      function (d) {
        return d.regenType == regen;
      }
    );

    return returned;
  };

  returned.deselectDot = function (x) {
    d3.selectAll("circle").classed("regen0", false);
    d3.selectAll("circle").classed("regen1", false);
    d3.selectAll("circle").classed("regen2", false);
    d3.selectAll("circle").classed("regen3", false);
    d3.selectAll("circle").classed("regen4", false);
    d3.selectAll("circle").classed("deselected", true);
    return returned;
  };

  //construct a dot plot

  // Gets or sets the dispatcher we use for selection events
  returned.selectionDispatcher = function (_) {
    if (!arguments.length) return dispatcher;
    dispatcher = _;
    return returned;
  };

  return returned;
}
