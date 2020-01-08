// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require gmaps/google
//= require jquery3
//= require popper
//= require bootstrap

window.latitudeValue = 0;
window.longitudeValue = 0;

function setUserLocation(m, callback) {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
            var currLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          
            var userMarker = new google.maps.Marker({
                position: currLocation,
                map: m
            });
            userMarker.setIcon('https://maps.google.com/mapfiles/ms/icons/blue-dot.png');

            userMarker.getPosition().lat();
            userMarker.getPosition().lng();

            m.setCenter(currLocation);
       },
       onGeolocateError,
       {enableHighAccuracy:true});
    }
 }

function initialize() {    
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        zoom: 10,
        mapTypeId: "roadmap"
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers

    var markers = [];

    for (var i = 0; i < gon.notes.length; i++)
    {
        markers.push([gon.notes[i].message, gon.notes[i].latitude, gon.notes[i].longitude])
    }

    var infoWindowContent = [];

    for (var i = 0; i < markers.length; i++)
    {
        infoWindowContent.push(
            ['<div class="info_content"><h4>' + markers[i][0] + '</h4></div>']
        )
    }

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(10);
        google.maps.event.removeListener(boundsListener);
    });

    setUserLocation(map);
}

function initMap(lat, lng) {

    var myCoords = new google.maps.LatLng(lat, lng);

    var mapOptions = {
        center: myCoords,
        zoom: 10,
        mapTypeId: "roadmap"
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var infowindow = new google.maps.InfoWindow({
        content: gon.message
    });

    var marker = new google.maps.Marker({
        position: myCoords,
        map: map
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

function getLocation() {
    if (window.navigator && window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError, {enableHighAccuracy:true});
    }
}

function onIndexGeolocateSuccess(coordinates)
{
    const {latitude, longitude} = coordinates.coords;
}

function onGeolocateSuccess(coordinates) {
    const { latitude, longitude } = coordinates.coords;
    document.getElementById('place_latitude').value = latitude;
    document.getElementById('place_longitude').value = longitude;
    map.setCenter(new google.maps.LatLng(latitude, longitude));
}

function onGeolocateError(error) {
    console.warn(error.code, error.message);
    if (error.code === 1) {
        alert("Error - " + error.message + "\nCode:" + error.code);
    } else if (error.code === 2) {
        alert("Error - Position unavailable");
    } else if (error.code === 3) {
        alert("Error - Timeout");
    }
}

function initMap2() {
    getLocation();

    var lat = document.getElementById('place_latitude').value;
    var lng = document.getElementById('place_longitude').value;
    
    // if not defined create default position
    if (!lat || !lng) {
        lat = 34.0713472;
        lng = -118.43829760000001;
    }

    var myCoords = new google.maps.LatLng(lat, lng);

    var mapOptions = {
        center: myCoords,
        zoom: 10,
        mapTypeId: "roadmap"
    };

    var map = new google.maps.Map(document.getElementById('map2'), mapOptions);
  
    var marker = new google.maps.Marker({
        position: myCoords,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: false
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
});
}