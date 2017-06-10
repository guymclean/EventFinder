function initMap(){

	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 55.9533, lng: -3.1883},
	  zoom: 13,
	  disableDefaultUI: true

	});

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
