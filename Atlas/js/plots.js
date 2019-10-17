// Part 1
var url = "https://data.austintexas.gov/resource/kz4x-q9k5.json";

var catArray = [];
var dogArray = [];

function makeDataArray(curRow) {
  
  myAge = curRow.age.substr(0, 2).trim();
  if (curRow.age.includes("year"))  {
    myAge = +myAge *12;
  } 
  else if (curRow.age.includes("week"))  {
    myAge = +myAge * 0.230137;
  } 
  else {
    myAge = +myAge;
  }
  // console.log("myAge", myAge);
  if (curRow.type === "Cat") {
    // console.log(catArray);
    console.log(typeof(myAge));
  	catArray.push(myAge);

  } else if (curRow.type === "Dog") {

  	dogArray.push(myAge);
  }
  
};
d3.json(url, function (response) {

  for (var i = 0; i < response.length; i++) {

    var currentRow = response[i];
    
    if (currentRow.location && currentRow.location.latitude )  {
     
      makeDataArray(currentRow);
        
    }
  }
  var trace1 = {
    labels: ["Cat", "Dog"],
    values: [catArray.length, dogArray.length],
    type: 'pie'
  };
  
  var data = [trace1];
  var layout = {
    title: "Animal Count",
  };
  Plotly.newPlot("plot", data, layout);

  var trace1 = {
    x: ["Cat", "Dog"],
    y: [d3.mean(catArray), d3.mean(dogArray)],
    type: "bar"
  };

  var data = [trace1];

  var layout = {
    title: "Average age",
    xaxis: { title:  "Animal Type" },
    yaxis: { title: "Age in Months" }
  };

  Plotly.newPlot("plot1", data, layout);

});


