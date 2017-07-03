

function displayAllEvents(eventList){
   if (eventList.length == 0) {
      $('#no-events').css({'display' : 'block'});
      return;}
   $('#no-events').css({'display' : 'none'});

   $.each(eventList, function(i, anEvent){
      displayEvent(anEvent);
   });

   map.fitBounds(mapBounds);
}


function displayEvent(anEvent){
   var $eventDiv = $('<div>').attr({class:'event', id:anEvent.index})
      .append($('<div>').attr({class:'event-title'}).html(anEvent.title))
      .append($('<div>').attr({class:'event-date'}).html(anEvent.displayDate))
      .append($('<p>').attr({class:'event-description'}).html(anEvent.shortDescription))
      .append($('<div>').attr({class:'event-map'}))
      .appendTo($resultsTable);

   addToMap(anEvent);
}


function closeEvent($anEvent){

   if (infoWindow){
      infoWindow.close();
   }

   $selectedEvent = null;
   var index = $anEvent.attr("id");
   var theEvent = eventList.events[index];

   $anEvent.attr("class","event");
   $anEvent.children(".event-title").html(theEvent.title);
   $anEvent.children("p").html(theEvent.shortDescription);
   
   $anEvent.find('.event-map').html(""); // remove mini map

   if (infoWindow){infoWindow.close();}

   map.fitBounds(mapBounds);
}


function openEvent($anEvent){

   if($selectedEvent != null){closeEvent($selectedEvent);}

   $selectedEvent = $anEvent;
   var index = $anEvent.attr("id");
   var theEvent = eventList.events[index];

   $anEvent.attr("class","event selected");
   $anEvent.children(".event-title").html("<a href=" + theEvent.url +
      " target='_blank'>" + theEvent.title + "</a>");
   $anEvent.children("p").html(theEvent.description);

   addMap($anEvent, theEvent.latLng, theEvent.address);
   $anEvent.children(".event-map").show();

   map.setCenter(theEvent.latLng);
   map.setZoom(14);
   createInfoWindow(theEvent, eventMarkers[index]);

   $anEvent.scrollView(); // bring top of event to top of browser window
}
