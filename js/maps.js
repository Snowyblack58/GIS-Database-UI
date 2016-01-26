var directionDisplay;
var map;
var directionsService = new google.maps.DirectionsService();
  
function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById("map_canvas"));
    directionsDisplay.setMap(map);
}


function calcRoute() {
  var start = '7701 Telegraph Road, Alexandria, VA';
  var end = $('[name=address]').val();
  
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
        console.log(response.routes[0].legs[0].distance.value / 1000 + ' miles');
        console.log(response);
    }
  });
}