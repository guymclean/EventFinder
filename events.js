var eventList = new listOfEvents();
var $selectedEvent = null;
//edinburgh 2 miles
//https://www.eventbriteapi.com/v3/events/search/?expand=venue&location.within=2mi&location.latitude=51.4613&location.longitude=-0.3037&categories=102&token=A4R4LVO3IMVUQITDVHNI



function getEvents(lat, lng, distance){

   var eventbriteAPIString = createEventbriteAPIString(lat, lng, distance);
   var meetupAPIString = createMeetupAPIString(lat, lng, distance);


   //display search animation
   $('#progress').css('display', 'block');

   $.when(
   //   $.get({
   //            url: "https://opentechcalendar.co.uk/api1/events.jsonp?callback=myfunc",
   //            type: "GET",
   //            dataType: "jsonp",
	//   }),
     $.get(eventbriteAPIString),
     $.get({
              url: meetupAPIString,
              type: "GET",
              dataType: "jsonp",
	  }),
	).done(function(eventbriteEvents, meetupEvents) {
		
		console.log("unformatted");
		console.log(meetupEvents);	
		
	     var eventbriteEvents = formatEventbriteEvents(eventbriteEvents[0].events);
		 
		 console.log("formatted");
		console.log(meetupEvents);
		
	     var meetupEvents = formatMeetupEvents(meetupEvents[0].results);
	     eventList.events = eventbriteEvents.concat(meetupEvents);

	     //hide search animation
	     $('#progress').css('display', 'none');

		 eventList.sortByDate();
	     displayAllEvents(eventList.events);


        $.each(eventList.events, function(i, event){
           if (event.address == null){
             console.log(i);
          }
        });

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
   var dateObject = new Date(eventObj.start.local);
   var dateString = parseDate(dateObject);
   var moreInfoLink = " <a href=" + eventObj.url +
      " target='_blank'>" + "More info" + "</a>";

   var anEvent = {
		index: 0,
      title: eventObj.name.text,
      description: eventObj.description.text + moreInfoLink,
      shortDescription: eventObj.description.text.slice(0,300) + "...",
      date: dateObject,
		displayDate: dateString,
      url: eventObj.url,
      address: eventObj.venue.address.localized_address_display,
      latLng: eventLatLng
      };

      return anEvent;
}


function createMeetupEvent(eventObj) {

   var eventLatLng = new google.maps.LatLng(eventObj.venue.lat, eventObj.venue.lon);
   var dateObject = new Date(eventObj.time);
   var dateString = parseDate(dateObject);
   var moreInfoLink = " <a href=" + eventObj.event_url +
      " target='_blank'>" + "More info" + "</a>";

   var anEvent = {
		index: 0,
      title: eventObj.name,
      description: eventObj.description + moreInfoLink,
      shortDescription: eventObj.description.slice(0,300) + "...",
		date: dateObject,
      displayDate: dateString,
      url: eventObj.event_url,
      address: eventObj.venue.address_1 + " " + eventObj.venue.city,
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

   // var q1 = 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=';
   // var q2 = '&limited_events=False&text_format=plain&only=description%2Ctime%2Cevent_url%2Cgroup.name%2Cname%2Cvenue.lon%2Cvenue.lat%2C&photo-host=public&page=30&radius=';
   // var q3 = '&category=34&lat=';
   // var q4 = '&desc=False&status=upcoming&sig_id=216618862&sig=924c46add844e29e36c4128c9e2b097273906e2b';
   
   var q1 = 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=';
	var q2 = '&limited_events=False&text_format=plain&only=name%2Cdescription%2Cevent_url%2Ctime%2Cvenue&photo-host=public&page=30&radius=';
	var q3 = '&category=34&lat=';
	var q4 = '&desc=False&status=upcoming&sig_id=216618862&sig=a3db75bd287bc8af20a76484dac69bf3129be91d';
	
   var query = q1 + userLng + q2 + userDist + q3 + userLat + q4;
   console.log(query);
   
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
   return moment(aDate).calendar();
}

function clearPreviousSearch(){
	eventsList = [];
   selectedEvent = null;
   $noEvents.detach();
   $resultsTable.empty();
   $noEvents.appendTo($resultsTable);
	// removeMarker();
	// mapBounds = new google.maps.LatLngBounds();
}
