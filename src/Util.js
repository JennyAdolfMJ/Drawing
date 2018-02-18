
var Util = {
    convertCoordinate : function(event, viewBox) {
      var x = event.clientX / window.innerWidth * viewBox.w + viewBox.x;
      var y = event.clientY / window.innerHeight * viewBox.h + viewBox.y;
        
      return {x: x, y: y};
    }
};

export default Util