var userLatLng;
var userAddress;

function addMap($anEvent, latLngObj, address){
	var lat = latLngObj.lat();
	var lng = latLngObj.lng();

	var q1 = "https://maps.googleapis.com/maps/api/staticmap?center=";
	var q2 = "&zoom=14&size=500x240&markers=";
	var q3 = "&key=AIzaSyAG73PJJYZhu68W9qNjDBjIVecXzgXiZIo";
	var query = q1 + lat + "," + lng + q2 + lat + "," + lng + q3;

	var mapImage = "<img class='mini-map' src=" + query + " title='Click for directions' alt='Click for directions'>";
	var mapLink = "https://maps.google.co.uk/maps?saddr=" + userAddress.replace(/ /g, "+") + "&daddr=" + address.replace(/ /g, "+");
	var mapString = "<a href=" + mapLink + " target='_blank'>" + mapImage + "</a>";

	$anEvent.find('.event-map').html(mapString);
}


function getAddress(lat, lng){


}


function initMap(){

	userLatLng = null;

	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 55.9533, lng: -3.1883},
	  zoom: 13,
	  disableDefaultUI: true
	});

	var geocoder = new google.maps.Geocoder;

	var input = document.getElementById('user-address');

	var options = { // complete this later!
		types: ['geocode'],
		componentRestrictions: {country: 'gb'} // UK only
	};

	var autocomplete = new google.maps.places.Autocomplete(input, options);

	autocomplete.bindTo('bounds', map); // is this necessary now?


	autocomplete.addListener('place_changed', function() {

	  var place = autocomplete.getPlace();
	  if (!place.geometry) {
		// User entered the name of a Place that was not suggested and
		// pressed the Enter key, or the Place Details request failed.
		window.alert("No details available for input: '" + place.name + "'");
		return;
	  }

	  userLatLng = place.geometry.location;
	  userAddress = autocomplete.gm_accessors_.place.Fc.l;

	  mapBounds = new google.maps.LatLngBounds();

	  var address = '';
	  if (place.address_components) {
		address = [
		  (place.address_components[0] && place.address_components[0].short_name || ''),
		  (place.address_components[1] && place.address_components[1].short_name || ''),
		  (place.address_components[2] && place.address_components[2].short_name || '')
		].join(' ');
	  }
	});

};
