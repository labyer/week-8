var myRectangle;
var drawLayers=[];
var myData;
var dataset = 'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/master/Landmark/Public_Art/LANDMARK_PublicArt.geojson';

$(document).ready(function() {
$.ajax(dataset).done(function(result) {
  var parsedData = JSON.parse(result);
  myData = _.chain(parsedData).value();
  var layer = L.geoJson(myData, {
    }).addTo(map);
  console.log(myData);
});
});

// Initialize Leaflet Draw
var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    marker: false,
    rectangle: true,
  }
});

map.addControl(drawControl);

// Run every time Leaflet draw creates a new layer
map.on('draw:created', function (e) {
    var type = e.layerType; // The type of shape
    var layer = e.layer; // The Leaflet layer for the shape
    var id = L.stamp(layer); // The unique Leaflet ID for the layer
    var shape = layer.toGeoJSON();

    drawLayers.push(layer);
    map.addLayer(layer);

    myRectangle = {
      "type": "FeatureCollection",
      "features": [shape]
    };

    var myWithin = turf.within(myData, myRectangle);

    _.each(myWithin.features, function(element){
      var template = '<div  class = "shape" id= "shape-'+element.id+'" data-id = "'+element.id+'"> <p> ArtID: '+element.properties.ArtID+'</p> <p> First Name: '+element.properties.First_Name+'</p>  </div>';
      $('#shapes').append(template);

      $('[data-id = "'+element.id+'"]').on('click',function(){
        var clickId = $(this).data('id');
        var point =_.filter(myWithin.features,function(ob) {
          return ob.id === clickId;});

      L.geoJson(point, {
          pointToLayer: function (feature, latlng) {
             return L.circleMarker(latlng);
          }
     }).addTo(map);
  });
  });
});
