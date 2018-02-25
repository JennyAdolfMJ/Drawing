import Util from "../Util/Util";

class Point 
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.refs = [];
  }

  set(p)
  {
    this.x = p.x;
    this.y = p.y;
  }

  addRef(lIndex, pIndex)
  {
    this.refs.push({lineIdx: lIndex, pointIdx: pIndex});
  }

  toString()
  {
    return this.x + "," + this.y;
  }

  copy()
  {
    return new Point(this.x, this.y);
  }
  
  static Add(p1, p2)
  {
    return new Point(p1.x+p2.x, p1.y+p2.y);
  }
  
  static Minus(p1, p2)
  {
    return new Point(p1.x-p2.x, p1.y-p2.y);
  }

  static Multi(point, factor)
  {
    return new Point(point.x*factor, point.y*factor);
  }
}

class Line
{
  constructor(p1, p2)
  {
    this.points = [p1, p2];
  }

  get length()
  {
    return Math.sqrt(Math.pow(this.points[0].x - this.points[1].x, 2) + Math.pow(this.points[0].y - this.points[1].y, 2));
  }

  extend(index, offset)
  {
    var length = this.length;
    var delta = Point.Minus(this.points[1-index], this.points[index]);
    this.points[index].x -= delta.x / length * offset;
    this.points[index].y -= delta.y / length * offset;
  }
}

class Wall
{
  constructor(sIndex, eIndex, index)
  {
    this.thickness = 240;
    this.vertices = [sIndex, eIndex];
    this.index = index;
  }

  getThickness()
  {
    return Util.convertLength(this.thickness / 2);
  }
}

export {Point, Line, Wall};

