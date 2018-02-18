

var Util = {
    convertCoordinate : function(event, viewBox) {
      var x = event.clientX / window.innerWidth * viewBox.w + viewBox.x;
      var y = (event.clientY - 40) / (window.innerHeight - 40) * viewBox.h + viewBox.y;
        
      return {x: x, y: y};
    },
    Operation: 
    {
      None: 0,
      Wall: 1
    }
};

export default Util