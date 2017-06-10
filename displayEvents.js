

function displayAllEvents(eventList){
   $.each(eventList, function(i, anEvent){
      displayEvent(anEvent);
   });
}


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
   eventDescription.innerHTML = anEvent.shortDescription;

   eventDiv.appendChild(eventTitle);
   eventDiv.appendChild(eventDate);
   eventDiv.appendChild(eventDescription);
   document.getElementById('results-table').appendChild(eventDiv);
}


function closeEvent($anEvent){
      var index = $anEvent.attr("id");
      var theEvent = eventList.events[index];

      $anEvent.attr("class","event");
      $anEvent.children(".event-title").html(theEvent.title);
      $anEvent.children("p").html(theEvent.shortDescription);
   }


function openEvent($anEvent){
   var index = $anEvent.attr("id");
   var theEvent = eventList.events[index];

   $anEvent.attr("class","event selected");
   $anEvent.children(".event-title").html("<a href=" + theEvent.url +
      " target='_blank' class='entry-summary'>" + theEvent.title + "</a>");
   $anEvent.children("p").html(theEvent.description);
}
