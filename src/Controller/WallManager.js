import Util from './../Util/Util';
import { Point, Line } from '../Model/Point';

var POWER_OFFSET = 100;
var OFFSET = 100;
var WALL_THICK = 16;

class WallManager {
  constructor()
  {
    this.instance = null;
    this.walls = [];
    this.vertices = [];
  }

  static GetInstance()
  {
    if (!this.instance) {
        this.instance = new WallManager();
    }
    return this.instance;
  }

  addWall(line)
  {
    var delta = Point.Multi(Point.Minus(line.points[1], line.points[0]), WALL_THICK / line.length);
    var point1 = [], point2 = [];

    point1.push(new Point(line.points[0].x - delta.y, line.points[0].y + delta.x));
    point1.push(new Point(line.points[0].x + delta.y, line.points[0].y - delta.x));
    point2.push(new Point(line.points[1].x + delta.y, line.points[1].y - delta.x));
    point2.push(new Point(line.points[1].x - delta.y, line.points[1].y + delta.x));
    this.vertices.push([point1, point2]);
    this.walls.push(line);
  }

  updateVertex(wallIdx, pointIdx)
  {
    var line = this.walls[wallIdx];
    var delta = Point.Multi(Point.Minus(line.points[1], line.points[0]), WALL_THICK / line.length);

    if (pointIdx === 0 || pointIdx === -1)
    {
      this.vertices[wallIdx][0][0] = new Point(line.points[0].x - delta.y, line.points[0].y + delta.x);
      this.vertices[wallIdx][0][1] = new Point(line.points[0].x + delta.y, line.points[0].y - delta.x);
    }

    if (pointIdx === 1 || pointIdx === -1)
    {
      this.vertices[wallIdx][1][0] = new Point(line.points[1].x + delta.y, line.points[1].y - delta.x);
      this.vertices[wallIdx][1][1] = new Point(line.points[1].x - delta.y, line.points[1].y + delta.x);
    }
  }

  mergePoint(line)
  {
    var merged;
    for (var i=0; i<2; i++)
    {
      merged = false;

      for(var j=0; j < this.walls.length-1; j++)
      {
        if (merged)
          break;

        for (var k=0; k<2; k++)
        {
          if (Util.getDistance([line.points[i], this.walls[j].points[k]], true) < POWER_OFFSET)
          {
            line.extend(i, OFFSET);
            this.walls[j].extend(k, OFFSET);
            this.walls[j].points[k] = Util.interLine(line, this.walls[j]);
            line.points[i] = this.walls[j].points[k];
            this.mergeVertex(this.walls.length-1, i, j, k);
            merged = true;
            break;
          }
        }
      }
    }
  }
  
  mergeVertex(wallIdx1, pointIdx1, wallIdx2, pointIdx2)
  { 
    this.updateVertex(wallIdx1, pointIdx1);
    this.updateVertex(wallIdx2, pointIdx2);

    if (pointIdx1 !== pointIdx2)
    {
      var line1 = new Line(this.vertices[wallIdx1][0][1], this.vertices[wallIdx1][1][0]);
      var line2 = new Line(this.vertices[wallIdx2][0][1], this.vertices[wallIdx2][1][0]);
      line1.extend(pointIdx1, OFFSET);
      line2.extend(1-pointIdx1, OFFSET);
      var inter = Util.interLine(line1, line2);
      this.vertices[wallIdx1][pointIdx1][1-pointIdx1] = inter;
      this.vertices[wallIdx2][pointIdx2][pointIdx1] = inter;

      line1 = new Line(this.vertices[wallIdx1][0][0], this.vertices[wallIdx1][1][1]);
      line2 = new Line(this.vertices[wallIdx2][0][0], this.vertices[wallIdx2][1][1]);
      line1.extend(pointIdx1, OFFSET);
      line2.extend(1-pointIdx1, OFFSET);
      inter = Util.interLine(line1, line2);
      this.vertices[wallIdx1][pointIdx1][pointIdx1] = inter;
      this.vertices[wallIdx2][pointIdx2][1-pointIdx1] = inter;
    }
    else
    {
      var line1 = new Line(this.vertices[wallIdx1][0][1], this.vertices[wallIdx1][1][0]);
      var line2 = new Line(this.vertices[wallIdx2][1][1], this.vertices[wallIdx2][0][0]);
      line1.extend(pointIdx1, OFFSET);
      line2.extend(1-pointIdx1, OFFSET);
      var inter = Util.interLine(line1, line2);
      this.vertices[wallIdx1][pointIdx1][1-pointIdx1] = inter;
      this.vertices[wallIdx2][pointIdx2][pointIdx1] = inter;

      line1 = new Line(this.vertices[wallIdx1][1][1], this.vertices[wallIdx1][0][0]);
      line2 = new Line(this.vertices[wallIdx2][0][1], this.vertices[wallIdx2][1][0]);
      line1.extend(1-pointIdx1, OFFSET);
      line2.extend(pointIdx1, OFFSET);
      inter = Util.interLine(line1, line2);
      this.vertices[wallIdx1][pointIdx1][pointIdx1] = inter;
      this.vertices[wallIdx2][pointIdx2][1-pointIdx1] = inter;
    }

  }
}

export default WallManager;