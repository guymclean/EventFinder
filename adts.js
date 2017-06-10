

function listOfEvents(){

   this.events = [];

   this.addEvent = function(anEvent){
      this.events.push(anEvent);
   };

   this.generateIndices = function(){
      for (i=0; i<this.events.length; i++){
         this.events[i].index = i;
      }
   };

   this.compareDates = function(eventA, eventB){
      return moment(eventA.date).isSameOrAfter(eventB.date); // remove first moment call?
   };

   this.sortByDate = function(){
      this.events.sort(this.compareDates);
      this.generateIndices();
   };

};
