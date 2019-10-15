var url = "https://data.austintexas.gov/resource/kz4x-q9k5.json";

var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
  maxZoom: 23,
  id: 'mapbox.satellite',
  accessToken: API_KEY
});

var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
  maxZoom: 23,
  id: 'mapbox.outdoors',
  accessToken: API_KEY
});
var dark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
  maxZoom: 23,
  id: 'mapbox.dark',
  accessToken: API_KEY
});

var baseLayers = {
  "Satellite": satellite,
  "Outdoors": outdoors,
  "Dark": dark       
};

// var overlays = {
//   "Cats Only": catPlaces     
// };
// ,
//   "Dogs Only": dogPlaces 
  // L.marker([+currentRow.location.latitude, +currentRow.location.longitude]).addTo(myMap);
var myMap = L.map('map', {
  center: [30.2672, -97.7431],
  zoom: 11,
  layers: [outdoors]
});
  // layers: [outdoors, catPlaces, dogPlaces]
  // layers: [outdoors, catPlaces]


// L.control.layers(baseLayers, overlays).addTo(myMap);

function markerColor(animalType) {
  if (animalType == 'Cat'){
    return 'red';
  } 
  else {
    return 'blue';
  }
};

var animalTypeArray = [];
var animalAgeArray = [];



function makeDataArray(curRow) {
  animalTypeArray.push(curRow.type);

  myAge = curRow.age.substr(0, 2).trim();

  if (curRow.age.includes("year"))  {
    myAge = +myAge *52;
  } 
  else if (curRow.age.includes("month"))  {
    myAge = +myAge *4;
  } 
  else {
    myAge = +myAge;
  }
  // console.log("myAge", myAge);
  animalAgeArray.push(myAge);
};
// var catPlaces = new L.LayerGroup();

d3.json(url, function (response) {

  console.log(response);
  // var currentMarker;
  for (var i = 0; i < response.length; i++) {

    var currentRow = response[i];
    
    if (currentRow.location && currentRow.location.latitude )  {
      // L.marker([+currentRow.location.latitude, +currentRow.location.longitude]).addTo(myMap);
      // currentMarker = "DOG_MARKER";
      // var newMarker =
      // return
      makeDataArray(currentRow);
      L.circleMarker([+currentRow.location.latitude, +currentRow.location.longitude], 
        {color: markerColor(currentRow.type),
          radius: 10,
          fill: false
        })
        .bindPopup("Age:" + currentRow.age)
        .addTo(myMap);


    }
  }
  console.log("ageArray", animalAgeArray);
  console.log("typeArray", animalTypeArray);

});

