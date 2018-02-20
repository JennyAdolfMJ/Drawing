import {Point} from './../Model/Point';

class Util 
{
  static get Operation()
  {
    return {
      None: 0,
      Wall: 1
    }
  }

  static convertCoordinate(event, viewBox) {
    var x = event.clientX / window.innerWidth * viewBox.w + viewBox.x;
    var y = (event.clientY - 40) / (window.innerHeight - 40) * viewBox.h + viewBox.y;
      
    return {x: x, y: y};
  }

  static getDistance(arr, square = false)
  {
    var length = Math.pow(arr[0].x - arr[1].x, 2) + Math.pow(arr[0].y - arr[1].y, 2);

    return square ? length : Math.sqrt(length);
  }

  static cross(p1, p2, p3, p4)
  {
    return (p2.x-p1.x)*(p4.y-p3.y) - (p2.y-p1.y)*(p4.x-p3.x);
  }

  static area(p1, p2, p3)
  {
    return this.cross(p1,p2,p1,p3)
  }

  static inter_(p1, p2, p3, p4)
  {
    var s1 = Math.abs(this.area(p1,p2,p3)); 
    var s2 = Math.abs(this.area(p1,p2,p4));  
    return new Point((p4.x*s1+p3.x*s2)/(s1+s2),(p4.y*s1+p3.y*s2)/(s1+s2));  
  }

  static inter(line1, line2)
  {
    return this.inter_(line1.points[0], line1.points[1], line2.points[0], line2.points[1]);
  }
};

export default Util