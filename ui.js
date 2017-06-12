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
	   $(this).css({'background' : 'rgba(255, 255, 255, 0.4)',
						'outline' : '2px  solid #A2A2DB',
    					'outline-offset' : '-10px',
						'cursor': 'pointer'});
	});

	// Mouseout event
	$(document).on('mouseout','.event',function(){
	   $(this).css({'background' : 'rgba(248, 248, 248, 0)',
						'outline' : 'none'});
	});


	// Click event
	$(document).on('click','.event',function(){
		if ($('a:hover').length == 0) { //don't close event if they're clicking on a link
			if($(this).attr('class') =='event selected'){
				closeEvent($(this));}
			else{
				if($selectedEvent != null){
					closeEvent($selectedEvent);}
				openEvent($(this));
			}
		}
	});

});

// function to scroll to bring selected event to top of screen
$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 300); // number here represents the scroll speed - 0 is instantaneous
    });
}
