var map;
var infowindow;
var item;

function initialize() {
  var pyrmont = new google.maps.LatLng(-6.3731984,106.8270672);
  navigator.geolocation.getCurrentPosition();
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: pyrmont,
    zoom: 15
  });

  var request = {
    location: pyrmont,
    radius: 2000,
    types: ['hospital']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    item = results[1];
    console.log(item);
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

(function(){
  var app = angular.module('clinic', ['app-directives']);

  app.controller('clinicController',function(){
    this.product = item;
    console.log(item.nam);
  });
})();


google.maps.event.addDomListener(window, 'load', initialize);
