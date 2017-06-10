
// LIST OF EVENTS
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

   this.sortByDate = function(){
      this.events.sort(function(eventA, eventB){
         return moment(eventA.date).isSameOrAfter(moment(eventB.date));
      });
      this.generateIndices();
   };

   this.sortByDistance = function(){ // code this
      this.events.sort(function(eventA, eventB){
         return moment(eventA.date).isSameOrAfter(moment(eventB.date));
      });
      this.generateIndices();
   };
};


// EVENT
function event(){

}
