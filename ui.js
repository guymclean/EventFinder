// Changes the reading of the distance label
function outputDistance(distance) {
	$('#miles').text(distance + " miles");
}

$(document).ready(function(){

	$resultsTable = $('#results-table');
	$scrollIcon = $('#scroll-icon');
	$noEvents = $('#no-events');
	$hiddenDiv = $('#hidden-div');
	$mapWindow = $('#map-window');
	$map = $('#map');

	makeResponsive();

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
		if ($(this).attr('class') =='event selected'){
			if (!$('a:hover').length){
				closeEvent($(this));}
		}
		// && !$('#MAP!!:hover').length - don't close event if they're clicking on a link or the map

		else{
			openEvent($(this));}
	});

	// display scroll to top icon if screen is scrolled
	$(document).scroll(function() {
	   if($(window).scrollTop() > 0) {
			$scrollIcon.css({'display' : 'block'});}
		else{
			$scrollIcon.css({'display' : 'none'});}
	});

	// scroll to top of screen when scroll icon is clicked
	$scrollIcon.click(function(){
        $('html,body').animate({ scrollTop: 0 }, 'medium');
        return false;
    });


	 function makeResponsive(){
		//  console.log("outside make responsive");
		//  console.log($hiddenDiv.children().length == 0);
		 	if ($(window).width() < 900){
				if (!$hiddenDiv.children().length){
					$map.detach();
					$map.appendTo($hiddenDiv);}}  // var mapHeight = $map.width()/1.8 + "px";
			else{
				if(!$mapWindow.find($map).length){ // if map window doesnt contain the map
					$map.detach();
					$map.appendTo($mapWindow);}}
	 }

	 $(window).resize(makeResponsive);


});

// function to scroll to bring selected event to top of screen
$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 300); // number here represents the scroll speed - 0 is instantaneous
    });
}
