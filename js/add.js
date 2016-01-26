//http://christianvarga.com/how-to-calculate-driving-distance-between-2-locations-with-google-maps-api/

var directionDisplay;
var map;
var directionsService = new google.maps.DirectionsService();
var umc ='';
var collegename;
var information;
  
function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById("map_canvas"));
    directionsDisplay.setMap(map);
}


function calcRoute() {
  var start = '7701 Telegraph Road, Alexandria, VA';
  var end = $('#address').val();
  
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  
directionsService.route(request, function(response, status) {
  if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
        $.ajax({
            type: 'POST',
            url: 'https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/php/create-college.php',
            data: {
                'collegename': collegename,
                'umc': umc,
                'miles': response.routes[0].legs[0].distance.value / 1000,
                'minutes': Math.ceil(response.routes[0].legs[0].duration.value / 60),
                'information': information
            },
            success: function(result){
                alert('Added ' + collegename + ' successfully.');
                $('table input[type="text"]').val('');
                $('#u').prop('checked', false);
                $('#m').prop('checked', false);
                $('#c').prop('checked', false);
            }
        }); 
    }
  });
}
                        
                        
$('#add_college_submit').click(function(){
    if($('#u').prop('checked')){
        umc += 'u';   
    }
    if($('#m').prop('checked')){
        umc += 'm';   
    }
    if($('#c').prop('checked')){
        umc += 'c';   
    }
    collegename = $('#college').val();
    information = $('#information').val();
    if(collegename !== ''){
        calcRoute();
    }
});

$('#add_contact_submit').click(function(){
    if($('#associated_college').val() !== ''){
        alert('Adding...');
        $.ajax({
            type: 'POST',
            url: 'https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/php/create-contact.php',
            data: {
                'contactname': $('#contact_name').val(),
                'title': $('#title').val(),
                'phone': $('#phone').val(),
                'email': $('#email').val(),
                'school': $('#associated_college').val(),
            },
            success: function(result){
                alert('Added ' + $('#contact_name').val() + ' successfully.');
                $('#contact_name').val('');
                $('#title').val('');
                $('#phone').val('');
                $('#email').val('');
                $('#associated_college').val('');
            },
            error: function(result){
                alert('Something went wrong. You probably already have this person as a contact.');
            }
        });
    } else {
        alert('invalid');   
    }
});


$('#delete_college_submit').click(function(){
    if($('#delete_college_name').val() !== $('#delete_college_name_again').val()){
        alert('Names do not match');   
    } else {
        $.ajax({
            type: 'POST',
            url: 'https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/php/delete-college.php',
            data: {
                'school': $('#delete_college_name').val()
            },
            success: function(result){
                alert('College deleted.');
                $('#delete_college_name').val('');
                $('#delete_college_name_again').val('');
            }
        });
    }
});


$('#delete_contact_submit').click(function(){
    $.ajax({
        type: 'POST',
        url: 'https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/php/delete-contact.php',
        data: {
            'contactname': $('#delete_contact_name').val(),
            'school': $('#delete_associated_college').val()
        },
        success: function(result){
            alert('Contact deleted.');
            $('#delete_contact_name').val('');
            $('#delete_associated_college').val('');
        }
    });
});

$('#header').click(function(){
    location.href = "https://www.tjhsst.edu/~2016dzhao/SideProjects/GIS/index.html"
});