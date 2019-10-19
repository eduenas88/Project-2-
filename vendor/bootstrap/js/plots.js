// Part 1
var url = "https://data.austintexas.gov/resource/kz4x-q9k5.json";


function makeAgeGroup(Age) {

  if (Age < 1 ) return "< 1 Month";
  else if  (Age >= 1 && Age <= 6) return "1-6 Month";
  else if  (Age > 6 && Age < 12) return "7-12 Month";
  else if  (Age >= 12 && Age <= 24) return "1-2 Year";
  else if  (Age > 24 && Age < 60) return "2-5 Year";
  else if  (Age >= 60 && Age <= 120) return "5-10 Year";
  else if  (Age > 120 ) return "10+ Year";
  else   return "Oops";
};

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
    
    // console.log(typeof(myAge));
  	catArray.push(makeAgeGroup(myAge));

  } else if (curRow.type === "Dog") {

  	dogArray.push(makeAgeGroup(myAge));
  }
  
};
console.log(catArray);

d3.json(url, function (response) {

  for (var i = 0; i < response.length; i++) {

    var currentRow = response[i];
    
    if (currentRow.location && currentRow.location.latitude )  {
     
      makeDataArray(currentRow);
        
    }
  }

    map = catArray.sort().reduce((m, v) => m.set(v, (m.get(v) || 0) + 1), new Map),
      valuesCat = [...map.keys()],
      countsCat = [...map.values()];

    console.log(valuesCat);

    var trace1 = {
      x: valuesCat,
      y: countsCat,
      name: 'Cats',
      type: 'bar',
      marker: {
        color: 'rgb(255,1,1)',
        opacity: 0.6
        }
    };

    map = dogArray.sort().reduce((m, v) => m.set(v, (m.get(v) || 0) + 1), new Map),
    valuesDog = [...map.keys()],
    countsDog = [...map.values()];

    var trace2 = {
      x: valuesDog,
      y: countsDog,
      name: 'Dogs',
      type: 'bar',
      marker: {
        color: 'rgb(0,0,255)',
        opacity: 0.6
        }
    };

    var data = [trace1, trace2];

    var layout = {barmode: 'group'};    

    var layout = {
      title: "Stray Animals Age Grouping",
      xaxis: { title:  "Age Groups" },
      yaxis: { title: "Age in Months" },
      barmode: 'group'
    };

    Plotly.newPlot("plot1", data, layout);

  // Pie char for total count copmarison
  var ultimateColors = ['rgb(255,1,1)', 'rgb(0,0,255)']

    var trace1 = {
      labels: ["Cat", "Dog"],
      values: [catArray.length, dogArray.length],
      type: 'pie',
      marker: {
        colors: ultimateColors
      }
    };
    
    var data = [trace1];
    var layout = {
      title: "Animal Count",
    };
    Plotly.newPlot("plot", data, layout);

});

