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
//= require jquery3
//= require popper
//= require bootstrap

function indexMap(lat, lng) {
    var map = new L.Map('map', lat, lng, 6);

    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

    var osmLayer = new L.TileLayer(osmUrl, {
        minZoom: 4,
        maxZoom: 20,
        attribution: osmAttrib
    });

    map.setView(new L.LatLng(lat, lng), 6);
    map.addLayer(osmLayer);

    for (var i = 0; i < gon.notes.length; i++)
    {
        var marker = L.marker([gon.notes[i].latitude, gon.notes[i].longitude]).bindPopup(gon.notes[i].message)
        marker.addTo(map);
    }

    return map;
}

function showMap(lat, lng) {
    var map = new L.Map('map', lat, lng, 6);

    // Data provider
    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

    // Layer
    var osmLayer = new L.TileLayer(osmUrl, {
        minZoom: 4,
        maxZoom: 20,
        attribution: osmAttrib
    });

    var marker = L.marker([lat, lng]);
    if (gon.message)
    {
        marker.bindPopup(gon.message);
    }
    marker.addTo(map);

    // Map
    map.setView(new L.LatLng(lat, lng), 6);
    map.addLayer(osmLayer);

    return map;
}

function getLocation() {
    if (window.navigator && window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError, {enableHighAccuracy: true});
    }
}

function getIndexLocation() {
    if (window.navigator && window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onIndexGeolocateSuccess, onIndexGeolocateError, {enableHighAccuracy: true});
    }
}

function onIndexGeolocateSuccess(coordinates) {
    const {latitude, longitude} = coordinates.coords;
    indexMap(latitude, longitude);
}

function onIndexGeolocateError(error) {
    console.warn(error.code, error.message);
    if (error.code === 1) {
        console.warn("Error - " + error.message + "\nCode:" + error.code);
    } else if (error.code === 2) {
        console.warn("Error - Position unavailable");
    } else if (error.code === 3) {
        console.warn("Error - Timeout");
    }
    
    var lat = 0;
    var lng = 0;

    indexMap(lat, lng);
}

function onGeolocateSuccess(coordinates)
{
    const {latitude, longitude} = coordinates.coords;
    document.getElementById("place_latitude").value = latitude;
    document.getElementById("place_longitude").value = longitude;
    showMap(latitude, longitude);
}

function onGeolocateError(error) {
    console.warn(error.code, error.message);
    if (error.code === 1) {
        console.warn("Error - " + error.message + "\nCode:" + error.code);
    } else if (error.code === 2) {
        console.warn("Error - Position unavailable");
    } else if (error.code === 3) {
        console.warn("Error - Timeout");
    }

    var lat = 0;
    var lng = 0;

    document.getElementById("place_latitude").value = lat;
    document.getElementById("place_longitude").value = lng;
    showMap(lat, lng);
}