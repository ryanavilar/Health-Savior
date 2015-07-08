var app = angular.module('clinic', ['app-directives']);
var map;
var infowindow;

app.controller('clinicController',function($scope){
	var mapOptions = {
		zoom: 15
	};

	var currentPos;

	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(function(position) {
  		var pos = new google.maps.LatLng(position.coords.latitude,
  			position.coords.longitude);

  		var infowindow = new google.maps.InfoWindow({
  			map: map,
  			position: pos,
  			content: 'Your location'
  		});
  		map.setCenter(pos);
  		console.log(pos);
  		var request = {
  			location: pos,
  			radius: 1000,
  			types: ['hospital']
  		};
  		infowindow = new google.maps.InfoWindow();
  		var service = new google.maps.places.PlacesService(map);
  		service.nearbySearch(request, function(results,status){
  			if (status == google.maps.places.PlacesServiceStatus.OK) {
  				$scope.$apply(function(){
  					$scope.locations = results;
  				});
  				console.log($scope.locations);
  				for (var i = 0; i < results.length; i++) {
  					console.log(results[i]);
  					createMarker(results[i]);
  				}	
  			}
  		});
  	}, function() {
  		handleNoGeolocation(true);
  	});
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
}
});

function handleNoGeolocation(errorFlag) {
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}

	var options = {
		map: map,
		position: new google.maps.LatLng(60, 105),
		content: content
	};

	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
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

