class Point 
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  toString()
  {
    return this.x + "," + this.y;
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

class Walls
{
  constructor()
  {
    this.walls = [];
    this.connections = [];
  }

  add(p1, p2)
  {
    this.walls.push(new Line(p1, p2));
  }

  addLine(line)
  {
    this.walls.push(line);
  }

  connect(p1, p2)
  {
    this.connections[p1].push(p2);
    this.connections[p2].push(p1);
  }

}

export {Point, Line};

