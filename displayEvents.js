

function displayAllEvents(eventList){
   if (eventList.length == 0) {
      $('#no-events').css({'display' : 'block'});
      return;
   }
   $('#no-events').css({'display' : 'none'});
   $.each(eventList, function(i, anEvent){
      displayEvent(anEvent);
   });
}

//CONVERT TO JQUERY///////////////////////////////////////
function displayEvent(anEvent){
   var eventDiv = document.createElement("div");
   eventDiv.setAttribute("class","event");
   eventDiv.setAttribute("id", anEvent.index);

   var eventTitle = document.createElement("div");
   eventTitle.setAttribute("class","event-title");
   eventTitle.innerHTML = anEvent.title;

   var eventDate = document.createElement("div");
   eventDate.setAttribute("class","event-date");
   eventDate.innerHTML = anEvent.displayDate;

   var eventDescription = document.createElement("p");
   eventDescription.setAttribute("class","event-description");
   eventDescription.innerHTML = anEvent.shortDescription;

   eventDiv.appendChild(eventTitle);
   eventDiv.appendChild(eventDate);
   eventDiv.appendChild(eventDescription);
   document.getElementById('results-table').appendChild(eventDiv);
}


function closeEvent($anEvent){
      $selectedEvent = null;
      var index = $anEvent.attr("id");
      var theEvent = eventList.events[index];

      $anEvent.attr("class","event");
      $anEvent.children(".event-title").html(theEvent.title);
      $anEvent.children("p").html(theEvent.shortDescription);

   }


function openEvent($anEvent){
   $selectedEvent = $anEvent;
   var index = $anEvent.attr("id");
   var theEvent = eventList.events[index];

   $anEvent.attr("class","event selected");
   $anEvent.children(".event-title").html("<a href=" + theEvent.url +
      " target='_blank'>" + theEvent.title + "</a>");
   $anEvent.children("p").html(theEvent.description);

   $anEvent.scrollView(); // bring top of event to top of browser window
}
