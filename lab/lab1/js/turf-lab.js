/* =====================
Lab 1: Turf.js

"Our maps have only interpreted data in various ways; the point is to change it."

In the coming weeks, we'll be looking at ways to explore, analyze, and create data. This will require us to build upon concepts that we've already mastered. Turf.js is a javascript library which provides some excellent utilities for fast, in-browser spatial analysis.

Recall that GeoJSON is a format for representing spatial objects in JSON. It encodes not only the geometric entities themselves (Points, Lines, Polygons) but also associated
properties (these are the properties of Features) and collections thereof (FeatureGroups).

This is useful for sending spatial data over the wire (we can present these objects in text since they are JSON). But the predictable structure of a geojson object (there are infinitely many possible geojson objects, though they all meet the criteria specified here: http://geojson.org/) also benefits us by offering a structure which our code can expect.

Consider the functions you've written before: their input has depended on the type of data they receive. If you write a function which expects an object that has an 'x' and a 'y' property, you can access those within your function body:

function exampleFunction(someObject) {
  return someObject.x + someObject.y;
}
exampleFunction({x: 1, y: 22}) === 23

Turf leans on the predictable structure of geojson to provide its analytic functions. Here, Turf lays out the types you can expect to find throughout its documentation:
http://turfjs.org/static/docs/global.html

Let's look to a turf function's docs: http://turfjs.org/static/docs/module-turf_average.html
==================================================================================================
name              - Type                        - Description
==================================================================================================
polygons          - FeatureCollection.<Polygon> - polygons with values on which to average
points            - FeatureCollection.<Point>   - points from which to calculate they average
field             - String                      - the field in the points features from which to
                                                  pull values to average
outputField       - String                      - the field in polygons to put results of the averages
==================================================================================================
Returns           - FeatureCollection.<Polygon> - polygons with the value of outField set to
                                                  the calculated averages
==================================================================================================

What this tells us is that turf.average takes four arguments. The first
argument is a FeatureCollection of Polygons, the second, is a FeatureCollection
of Points, the third and fourth is a bit of text.

With those inputs, a FeatureCollection of polygons is produced which has the average value
of "field" from the points (captured within a spatial join) stored on its properties' field
"outputField".

All of the functionality within turf can be similarly understood by looking to its documentation.
Turf documentation: http://turfjs.org/static/docs/
Turf examples: http://turfjs.org/examples.html


Each exercise in this lab involves the creation of GeoJSON (feel free to use geojson.io) and
the use of that GeoJSON in some turf functions.

NOTE: you can use geojson.io's table view to attach properties to your geometries!

Exercise 1: Finding the nearest point
Take a look at http://turfjs.org/static/docs/module-turf_nearest.html
Produce a Feature and a FeatureCollection (look to the in-documentation examples if this is
unclear) such that the single Point Feature is in Philadelphia and the nearest point in the
FeatureCollection (there should be at least two other points in this collection) happens
to be in New York City. Plot the NYC point and no others with the use of turf.nearest.


Exercise 2: Finding the average point value (a form of spatial join)
Docs here: http://turfjs.org/static/docs/module-turf_average.html
Produce one FeatureCollection of points (at least 5) and one of polygons (at least 2)
such that, by applying turf.average, you generate a new set of polygons in which one of
the polygons has the property "averageValue" with a value of 100.


Exercise 3: Tagging points according to their locations
http://turfjs.org/static/docs/module-turf_tag.html
It can be quite useful to 'tag' points in terms of their being within this or that polygon. You might, for instance, want to color markers which represent dumpsters according to the day that trash is picked up in that area. Create three polygons and use properties on those polygons to color 5 points.


*STRETCH GOAL*
Exercise 4: Calculating a destination
A species of bird we're studying is said to travel in a straight line for 500km during a migration before needing to rest. One bird in a flock we want to track has a GPS tag which seems to be on the fritz. We know for a fact that it started flying from [-87.4072265625, 38.376115424036016] and that its last known coordinate was [-87.5830078125, 38.23818011979866]. Given this information, see if you can
determine where we can expect this flock of birds to rest.
===================== */


//Exercise 1 - turf.nearest
var point = {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-75.1633071899414,39.946595007738985]}};
var against = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.97575378417967,40.76702162667872]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.14147949218749,42.807491865911544]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.96270751953125,43.401056495052906]}}]};

var nearest = turf.nearest(point, against);
var marker = L.geoJson(nearest);
marker.addTo(map);



//Exercise 2 - turf.average
var points = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"value":50},"geometry":{"type":"Point","coordinates":[-73.7677001953125,43.08493742707592]}},{"type":"Feature","properties":{"value":150},"geometry":{"type":"Point","coordinates":[-73.77086520195007,43.08199896224983]}},{"type":"Feature","properties":{"value":50},"geometry":{"type":"Point","coordinates":[-73.77136677503586,43.082847213566744]}},{"type":"Feature","properties":{"value":150},"geometry":{"type":"Point","coordinates":[-73.77194613218307,43.08359358665166]}},{"type":"Feature","properties":{"value":50},"geometry":{"type":"Point","coordinates":[-73.77234846353531,43.082710083664715]}},{"type":"Feature","properties":{"value":150},"geometry":{"type":"Point","coordinates":[-73.77287417650223,43.08186378947703]}},{"type":"Feature","properties":{"value":85},"geometry":{"type":"Point","coordinates":[-73.77354204654694,43.08218311018505]}}]};
var polygons = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-73.773193359375,43.084576982974696],[-73.77323627471924,43.0808940630151],[-73.76675605773926,43.080831373099464],[-73.76606941223145,43.086159786931944],[-73.773193359375,43.084576982974696]]]}},{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-73.77418041229248,43.08295495827443],[-73.77339720726013,43.08317828306516],[-73.7733381986618,43.08202638857311],[-73.77403020858765,43.08147785977432],[-73.77418041229248,43.08295495827443]]]}}]};

// //plot points and polygons on their own..unnecessary for this task but for viewing purposes
// var plotPoints = L.geoJson(points);
// var plotPolygons = L.geoJson(polygons);
// plotPoints.addTo(map);
// plotPolygons.addTo(map);

var averaged = turf.average(polygons, points, 'value', 'avg_value');
console.log(averaged);
var plotAveraged = L.geoJson(averaged, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup(""+feature.properties.avg_value);
  }
});
// console.log(plotAveraged);
plotAveraged.addTo(map);



// //Exercise 3 - turf.tag
var points = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.78225922584534,43.07906819295097]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.78546714782715,43.07935030518439]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.78527402877808,43.07864502216539]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.78389000892639,43.07900550116715]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.7831175327301,43.07832372387631]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.78453373908995,43.07825319475806]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.78244161605835,43.07867636824973]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-73.78466248512268,43.079177903418305]}}]};
var polygons = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"stroke":"#555555","stroke-width":2,"stroke-opacity":1,"fill":"#0d0de6","fill-opacity":0.5},"geometry":{"type":"Polygon","coordinates":[[[-73.7826669216156,43.07939732376367],[-73.7828278541565,43.07848829150312],[-73.78215193748474,43.078566656884384],[-73.7817656993866,43.07920924923004],[-73.7826669216156,43.07939732376367]]]}},{"type":"Feature","properties":{"stroke":"#555555","stroke-width":2,"stroke-opacity":1,"fill":"#e1170d","fill-opacity":0.5},"geometry":{"type":"Polygon","coordinates":[[[-73.78363251686096,43.07869987780247],[-73.78377199172974,43.07805728011483],[-73.78270983695984,43.07813564604729],[-73.78252744674683,43.07844127222628],[-73.78363251686096,43.07869987780247]]]}},{"type":"Feature","properties":{"stroke":"#555555","stroke-width":2,"stroke-opacity":1,"fill":"#33cd12","fill-opacity":0.5},"geometry":{"type":"Polygon","coordinates":[[[-73.78500580787659,43.0785980030088],[-73.78494143486023,43.07826886790247],[-73.78430843353271,43.07815915580748],[-73.78337502479553,43.07928761368922],[-73.78493070602417,43.07951487005405],[-73.78500580787659,43.0785980030088]]]}},{"type":"Feature","properties":{"stroke":"#555555","stroke-width":2,"stroke-opacity":1,"fill":"#eeee2d","fill-opacity":0.5},"geometry":{"type":"Polygon","coordinates":[[[-73.78592848777771,43.0794756879823],[-73.7852418422699,43.079695107261266],[-73.78509163856506,43.07844127222628],[-73.78573536872864,43.0785274742063],[-73.78592848777771,43.0794756879823]]]}}]};

// //plot points and polygons on their own..unnecessary for this task but for viewing purposes
// var plotPoints = L.geoJson(points, {
//   pointToLayer: function (feature, latlng) {
//     return L.circleMarker(latlng);
//   }
// });
// var plotPolygons = L.geoJson(polygons, {
//   style: function (feature, layer) {
//     return { 'fillColor': feature.properties.fill };
//   }
// });
// plotPoints.addTo(map);
// plotPolygons.addTo(map);

var tagged = turf.tag(points, polygons, 'fill', 'markerColor');
var plotTagged = L.geoJson(tagged, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {'fillColor': feature.properties.markerColor, 'color': feature.properties.markerColor});
  }
});
plotTagged.addTo(map);
