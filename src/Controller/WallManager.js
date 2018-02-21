import Util from './../Util/Util';
import { Point, Line, Wall } from '../Model/Point';

var POWER_OFFSET = 100;
var OFFSET = 100;
var WALL_THICK = 16;

class WallManager {
  constructor()
  {
    this.instance = null;
    this.pointCur = 0;
    this.points = [];
    this.wallCur = 0;
    this.walls = [];
    this.borders = [];
  }

  static GetInstance()
  {
    if (!this.instance) {
        this.instance = new WallManager();
    }
    return this.instance;
  }

  addWall(sp, ep)
  {
    sp.index = this.pointCur++;
    ep.index = this.pointCur++;
    this.points.push(sp, ep);
    var wall = new Wall(sp.index, ep.index, this.wallCur++);
    sp.addRef(wall.index, 0);
    ep.addRef(wall.index, 1);
    this.walls.push(wall);

    this.createBorder(wall.index);
  }

  getLine(index)
  {
    var wall = this.walls[index];
    return new Line(this.points[wall.vertices[0]], this.points[wall.vertices[1]]);
  }

  createBorder(wallIdx)
  {
    var line = this.getLine(wallIdx);
    var delta = Point.Multi(Point.Minus(line.points[1], line.points[0]), WALL_THICK / line.length);
    var point1 = [], point2 = [];

    point1.push(new Point(line.points[0].x - delta.y, line.points[0].y + delta.x));
    point1.push(new Point(line.points[0].x + delta.y, line.points[0].y - delta.x));
    point2.push(new Point(line.points[1].x + delta.y, line.points[1].y - delta.x));
    point2.push(new Point(line.points[1].x - delta.y, line.points[1].y + delta.x));
    this.borders.push([point1, point2]);
  }

  updateBorder(wallIdx, pointIdx)
  {
    var line = this.getLine(wallIdx);
    var delta = Point.Multi(Point.Minus(line.points[1], line.points[0]), WALL_THICK / line.length);

    if (pointIdx === 0 || pointIdx === -1)
    {
      this.borders[wallIdx][0][0] = new Point(line.points[0].x - delta.y, line.points[0].y + delta.x);
      this.borders[wallIdx][0][1] = new Point(line.points[0].x + delta.y, line.points[0].y - delta.x);
    }

    if (pointIdx === 1 || pointIdx === -1)
    {
      this.borders[wallIdx][1][0] = new Point(line.points[1].x + delta.y, line.points[1].y - delta.x);
      this.borders[wallIdx][1][1] = new Point(line.points[1].x - delta.y, line.points[1].y + delta.x);
    }
  }

  mergePoint(wall)
  {
    var newLine = this.getLine(wall.index);

    for (var i=0; i<2; i++)
    {
      for(var j=0; j < this.points.length; j++)
      {
        if(newLine.points[i] === this.points[j])
          return;

        if (Util.getDistance([newLine.points[i], this.points[j]], true) < POWER_OFFSET)
        {
          var oldLine = this.getLine(this.points[j].refs[0].lineIdx);
          var oldIndex = this.points[j].refs[0].pointIdx;
          oldLine.extend(oldIndex, OFFSET);
          newLine.extend(i, OFFSET);
          this.points[j].set(Util.interLine(newLine, oldLine));
          wall.vertices[i] = j;
          this.points[j].addRef(wall.index, i);
          this.mergeBorder(this.points[j]);
          break;
        }
      }
    }
  }
  
  mergeBorder(point)
  {
    for(var i=1; i<point.refs.length; i++)
    {
      var wallIdx1 = point.refs[i-1].lineIdx;
      var pointIdx1 = point.refs[i-1].pointIdx;
      var wallIdx2 = point.refs[i].lineIdx;
      var pointIdx2 = point.refs[i].pointIdx;

      this.updateBorder(wallIdx1, pointIdx1);
      this.updateBorder(wallIdx2, pointIdx2);
  
      if (pointIdx1 !== pointIdx2)
      {
        var line1 = new Line(this.borders[wallIdx1][0][1], this.borders[wallIdx1][1][0]);
        var line2 = new Line(this.borders[wallIdx2][0][1], this.borders[wallIdx2][1][0]);
        line1.extend(pointIdx1, OFFSET);
        line2.extend(1-pointIdx1, OFFSET);
        var inter = Util.interLine(line1, line2);
        this.borders[wallIdx1][pointIdx1][1-pointIdx1] = inter;
        this.borders[wallIdx2][pointIdx2][pointIdx1] = inter;
  
        line1 = new Line(this.borders[wallIdx1][0][0], this.borders[wallIdx1][1][1]);
        line2 = new Line(this.borders[wallIdx2][0][0], this.borders[wallIdx2][1][1]);
        line1.extend(pointIdx1, OFFSET);
        line2.extend(1-pointIdx1, OFFSET);
        inter = Util.interLine(line1, line2);
        this.borders[wallIdx1][pointIdx1][pointIdx1] = inter;
        this.borders[wallIdx2][pointIdx2][1-pointIdx1] = inter;
      }
      else
      {
        var line1 = new Line(this.borders[wallIdx1][0][1], this.borders[wallIdx1][1][0]);
        var line2 = new Line(this.borders[wallIdx2][0][0], this.borders[wallIdx2][1][1]);
        line1.extend(pointIdx1, OFFSET);
        line2.extend(pointIdx1, OFFSET);
        var inter = Util.interLine(line1, line2);
        this.borders[wallIdx1][pointIdx1][1-pointIdx1] = inter;
        this.borders[wallIdx2][pointIdx2][pointIdx1] = inter;
  
        line1 = new Line(this.borders[wallIdx1][0][0], this.borders[wallIdx1][1][1]);
        line2 = new Line(this.borders[wallIdx2][0][1], this.borders[wallIdx2][1][0]);
        line1.extend(pointIdx1, OFFSET);
        line2.extend(pointIdx1, OFFSET);
        inter = Util.interLine(line1, line2);
        this.borders[wallIdx1][pointIdx1][pointIdx1] = inter;
        this.borders[wallIdx2][pointIdx2][1-pointIdx1] = inter;
      }
    }
  }
}

export default WallManager;