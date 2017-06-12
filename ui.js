// Changes the reading of the distance label
function outputDistance(distance) {
	$('#miles').text(distance + " miles");
}

$(document).ready(function(){

	// Find Events on click
   $('#findEvents').on('click', function(){

		if (userLatLng == undefined){
			alert("You've not entered your location...");
			return;
		}
		clearPreviousSearch();

		var lat = userLatLng.lat();
		var lng = userLatLng.lng();
		var distance = $('#distance-slider').val();

      getEvents(lat, lng, distance);
   });

	// Mouseover event
	$(document).on('mouseover','.event',function(){
	   $(this).css({'background-color' : 'rgb(255, 55, 55)', 'cursor': 'pointer'});
	});

	// Mouseout event
	$(document).on('mouseout','.event',function(){
	   $(this).css('background-color', '#ffffff');
	});

	// Click event
	$(document).on('click','.event',function(){
		console.log($(this).attr('class') =='event selected');
		if($(this).attr('class') =='event selected'){
			closeEvent($(this));
		}
		else{
			//close other selected eventDiv
			openEvent($(this));
		}
	});

});
