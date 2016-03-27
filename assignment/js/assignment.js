// Assignment

/*
## Variation One:
- The user draws a shape on map
- All points that overlap with the shape should be represented as separate is in the sidebar
- When the user clicks on an i in the sidebar, the corresponding point on the map should become highlighted
*/



// global variables
var polygon=[];
var allPoints=[];
var geoJSONPoints=[];
var pointsWithin=[];
var plotPointsWithin=[];



// view dataset
var dataset = 'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/master/Landmark/Public_Art/LANDMARK_PublicArt.geojson';
$.ajax(dataset).done(function(data) {
  parsedData = JSON.parse(data);
  allPoints = _.chain(parsedData).value();
  geoJSONPoints = L.geoJson(allPoints, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {fillColor: '#2e415b', stroke: 0, fillOpacity: 0.95});
    }
  });
  geoJSONPoints.addTo(map);
});



// Initialize Leaflet Draw
var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: { shapeOptions: {
      color: '#09101a',
      fillOpacity: 0.2,
      opacity: 0.9
      }
    },
    circle: false,
    marker: false,
    rectangle: false,
  }
});
map.addControl(drawControl);



// mouseover function
// 2016-03-27 0427PM - right now mouseover function adds all points within a polygon over and over again and does not remove them when you move the mouse off the sidebar elements
var mouseover = function(){
  plotPointsWithin = L.geoJson(pointsWithin, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {fillColor: '#ff9f00', stroke: 0, color: '#2e415b', fillOpacity: 1, opacity: 1, radius: 15 });
    }
  });
  map.addLayer(plotPointsWithin);
  // return plotPointsWithin;
  // mouseleave();
};



//mouseleave function - to remove the highlighted points(s)
// 2016-03-27 0441PM - not working yet...
var mouseleave = function () {
  map.removeLayer(plotPointsWithin);
};



// Run every time Leaflet draw creates a new layer
map.on('draw:created', function (e) {

  $('#shapes').empty(); // clear the sidebar

  var type = e.layerType; // The type of shape
  var layer = e.layer; // The Leaflet layer for the shape
  var id = L.stamp(layer); // The unique Leaflet ID for the layer
  var shape = layer.toGeoJSON();
  map.addLayer(layer);

  map.on('draw:created', function () {
    map.removeLayer(plotPointsWithin);  // 2016-03-27 0445PM - doesn't seem to do anything at the moment...
    map.removeLayer(layer);
    return layer;
  });

  polygon = {
    "type": "FeatureCollection",
    "features": [shape]
  };

  pointsWithin = turf.within(allPoints, polygon);
  // console.log(allPoints);
  // console.log(polygon);
  // console.log(pointsWithin);

  _.each(pointsWithin.features, function(i){
    // dataset info to show on sidebar
    var firstName = i.properties.First_Name;
    var lastName = i.properties.Last_Name;
    var location = i.properties.Location;
    var category = i.properties.Category;
    var html = '<div  class = "shape" id= "shape-'+i.id+'" data-id = "'+i.id+'" onmouseover = "mouseover()"  onmouseleave = "mouseleave()"> <br> <HR> <br> <h2> '+firstName+' '+lastName+'</h2> <p>'+location+'</p> <p> '+category+'</p> </div>';
    $('#header').text('CAMBRIDGE PUBLIC ART EXHIBITS WITHIN SPECIFIED AREA');
    $('#shapes').append(html);
  });
});
