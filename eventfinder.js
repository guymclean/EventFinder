





// distance slider
function outputUpdate(vol) {
	document.querySelector('#miles').value = vol + " miles";
}


//mouseover
$(document).on('mouseover','.event',function(){
   $(this).css({'background-color' : 'rgb(255, 55, 55)', 'cursor': 'pointer'});
});

// mouseout
$(document).on('mouseout','.event',function(){
   $(this).css('background-color', '#ffffff');
});

// if event isn't selected, select it
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








var userLatLng;

var eventList = new listOfEvents();

// look at this address for info of event obj returned from api
//edinburgh 2 miles
//https://www.eventbriteapi.com/v3/events/search/?expand=venue&location.within=2mi&location.latitude=51.4613&location.longitude=-0.3037&categories=102&token=A4R4LVO3IMVUQITDVHNI
//london 4 miles
//https://www.eventbriteapi.com/v3/events/search/?expand=venue&location.within=4mi&location.latitude=51.5074&location.longitude=0.1278&categories=102&token=A4R4LVO3IMVUQITDVHNI


$(document).ready(function(){

   $('#findEvents').on('click', function(){
      getEvents(); // will pass in lat lng
   });


});


function getEvents(){

   var userLat = 55.9533;
   var userLng = -3.1883;
   var userDist = 5;

   // var edinburghAPIString = 'https://www.eventbriteapi.com/v3/events/search/?expand=venue&location.within=2mi&location.latitude=51.4613&location.longitude=-0.3037&categories=102&token=A4R4LVO3IMVUQITDVHNI';
   // var londonAPIString = 'https://www.eventbriteapi.com/v3/events/search/?expand=venue&location.within=4mi&location.latitude=51.5074&location.longitude=0.1278&categories=102&token=A4R4LVO3IMVUQITDVHNI';

   var eventbriteAPIString = createEventbriteAPIString(userLat, userLng, userDist);
   var meetupAPIString = createMeetupAPIString(userLat, userLng, userDist);

   var eventbriteEvents;
   var meetupEvents;

   //display search animation#
   $('#progress').css('display', 'block');

   $.when(
     // Get Eventbrite events
     $.get(eventbriteAPIString, function(events) {
      //   eventbriteEvents = formatEventbriteEvents(events);
      //   console.log("Eventbrite events");
      //   console.log(eventbriteEvents);
     }),
     // Get Meetup events
   //   $.get(meetupAPIString, function(events) {
   //      meetupEvents = formatEventbriteEvents(events);
   //    //   console.log("Meetup events");
   //    //   console.log(meetupEvents);
   //   }),
     $.get({
              url: meetupAPIString,
              type: "GET",
              dataType: "jsonp",
              success: function (events) {
               //   console.log('before formatyting meetup');
               //   console.log(events.results);
               //   meetupEvents = formatMeetupEvents(events['results']);
               //   console.log("after formatting meetup events:");
               //   console.log(events.results);
     }}),

  ).done(function(eventbriteEvents, meetupEvents) {

     console.log('before formatting meetup:');
     console.log(meetupEvents);
     console.log("before formatting eventbrite:");
     console.log(eventbriteEvents);

     eventbriteEvents = formatEventbriteEvents(eventbriteEvents[0].events);
     meetupEvents = formatMeetupEvents(meetupEvents[0].results);

     console.log('after formatting meetup:');
     console.log(meetupEvents);
     console.log("after formatting eventbrite:");
     console.log(eventbriteEvents);

     eventList.events = eventbriteEvents.concat(meetupEvents);



     //hide search animation
     $('#progress').css('display', 'none');



	eventList.sortByDate();



console.log(eventList.events);

     displayAllEvents(eventList.events);

});

}

function formatEventbriteEvents(unformattedEvents){

	var eventArray = [];

   $.each(unformattedEvents, function(i, unformattedEvent){
		//check each object has suitable attributes/values
		if (unformattedEvent.hasOwnProperty('venue') && unformattedEvent.venue.address.latitude != null
			&& unformattedEvent.name.text != null
			&& unformattedEvent.start.local != null
			&& unformattedEvent.hasOwnProperty('url') && unformattedEvent.url != null
			&& unformattedEvent.description.text != null)
			{
				var anEvent = createEventbriteEvent(unformattedEvent);
		      eventArray.push(anEvent);
			}
   });

   return eventArray;
}


function formatMeetupEvents(unformattedEvents){

   var eventArray = [];

   $.each(unformattedEvents, function(i, unformattedEvent){
		//check each object has suitable attributes/values *** MAKE THIS A SEPARATE COMPREHENSIVE FUNCTION
		if (unformattedEvent.hasOwnProperty('venue') && unformattedEvent.venue.lat != null
			&& unformattedEvent.name != null
			&& unformattedEvent.time != null
			&& unformattedEvent.hasOwnProperty('event_url') && unformattedEvent.event_url != null
			&& unformattedEvent.hasOwnProperty('description') && unformattedEvent.description != null)
		{
         var anEvent = createMeetupEvent(unformattedEvent);
         eventArray.push(anEvent);
      }
   });

   return eventArray;
}



function createEventbriteEvent(eventObj) {

   var eventLatLng = new google.maps.LatLng(eventObj.venue.address.latitude, eventObj.venue.address.longitude);

   var dateString = eventObj.start.local;
   dateString = parseDate(dateString);

   var anEvent = {
		index: 0,
      title: eventObj.name.text,
      description: eventObj.description.text,
      shortDescription: eventObj.description.text.slice(0,300) + "...",
      date: eventObj.start.local,
		displayDate: dateString,
      url: eventObj.url,
      latLng: eventLatLng
      };

      return anEvent;
}


function createMeetupEvent(eventObj) {

   var eventLatLng = new google.maps.LatLng(eventObj.venue.lat, eventObj.venue.lon);

   var dateObject = eventObj.time;
   dateObject = new Date(dateObject);
   var dateString = parseDate(dateObject);

   var anEvent = {
		index: 0,
      title: eventObj.name,
      description: eventObj.description,
      shortDescription: eventObj.description.slice(0,300) + "...",
		date: dateObject,
      displayDate: dateString,
      url: eventObj.event_url,
      latLng: eventLatLng
      };

      return anEvent;
}



function createEventbriteAPIString(userLat, userLng, userDist){

   var q1 = 'https://www.eventbriteapi.com/v3/events/search/?expand=venue&location.within=';
   var q2 = 'mi&location.latitude=';
   var q3 = '&location.longitude=';
   var q4 = '&categories=102&token=A4R4LVO3IMVUQITDVHNI';

   var query = q1 + userDist + q2 + userLat + q3 + userLng + q4;
   return query;
}


function createMeetupAPIString(userLat, userLng, userDist){

   var q1 = 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=';
   var q2 = '&limited_events=False&text_format=plain&only=description%2Ctime%2Cevent_url%2Cgroup.name%2Cname%2Cvenue.lon%2Cvenue.lat%2C&photo-host=public&page=30&radius=';
   var q3 = '&category=34&lat=';
   var q4 = '&desc=False&status=upcoming&sig_id=216618862&sig=924c46add844e29e36c4128c9e2b097273906e2b';

   var query = q1 + userLng + q2 + userDist + q3 + userLat + q4;
   return query;
}


function parseDate(aDate){

   moment.updateLocale('en', {
      calendar : {
        sameDay : '[Today @] HHmm',
        nextDay : '[Tomorrow @] HHmm',
        nextWeek : 'ddd [@] HHmm',
        sameElse : 'ddd Do MMM [@] HHmm'
      }
   });

   // aDate = new Date(aDate);
   return moment(aDate).calendar();

   // return aDate;
}
