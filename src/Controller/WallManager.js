import Util from './../Util/Util';
import { Point, Line, Wall } from '../Model/Point';

var POWER_OFFSET = 256;
var OFFSET = 100;

class WallManager {
  constructor()
  {
    this.instance = null;
    this.pointCur = 0;
    this.points = [];
    this.wallCur = 0;
    this.walls = [];
    this.borders = [];
    this.sublines = new Map();
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

    var index = this.findNearPoint(sp);
    if(index>0)
      sp.set(this.points[index]);
    
    this.points.push(sp, ep);
    var wall = new Wall(sp.index, ep.index, this.wallCur++);
    sp.addRef(wall.index, 0);
    ep.addRef(wall.index, 1);
    this.walls.push(wall);
    this.borders.push([new Array(2), new Array(2)]);

    this.updateBorder(wall.index);
  }

  getLine(index)
  {
    var wall = this.walls[index];
    return new Line(this.points[wall.vertices[0]], this.points[wall.vertices[1]]);
  }

  getBorderLine(wallIdx, borderIdx)
  {
    var line;
    if(borderIdx === 0) {
      line = new Line(this.borders[wallIdx][0][1], this.borders[wallIdx][1][0]);
    }
    else {
      line = new Line(this.borders[wallIdx][0][0], this.borders[wallIdx][1][1]);
    }
    return line;
  }

  findNearPoint(point)
  {
    for(var j=0; j < this.points.length; j++)
    {
      if (Util.getDistance([point, this.points[j]], true) < POWER_OFFSET)
        return j;
    }

    return -1;
  }

  updateBorder(wallIdx, pointIdx = -1)
  {
    var line = this.getLine(wallIdx);
    var delta = Point.Multi(Point.Minus(line.points[1], line.points[0]), this.walls[wallIdx].getThickness() / line.length);

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

  genSubline(index)
  {
    for(var j=0; j < this.points.length; j++)
    {
      if(index === j)
        continue;

      if (Util.getDistance([this.points[index], this.points[j]], true) < POWER_OFFSET)
        continue;

      else if (Math.abs(this.points[index].x - this.points[j].x) < OFFSET)
      {
        this.points[index].x = this.points[j].x;
        this.sublines.set(j+","+index+"x", new Point(this.points[j].x, 0));
      }
      else if(this.sublines.has(j+","+index+"x"))
      {
        this.sublines.delete(j+","+index+"x");
      }
      else if (Math.abs(this.points[index].y - this.points[j].y) < OFFSET)
      {
        this.points[index].y = this.points[j].y;
        this.sublines.set(j+","+index+"y", new Point(0, this.points[j].y));
      }
      else if(this.sublines.has(j+","+index+"y"))
      {
        this.sublines.delete(j+","+index+"y");
      }
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
          continue;

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
    for(var i=0; i<point.refs.length; i++)
    {
      var wallIdx = point.refs[i].lineIdx;
      var pointIdx = point.refs[i].pointIdx;

      this.updateBorder(wallIdx, pointIdx);
    }

    for(i=0; i<point.refs.length; i++)
    {
      for(var j=i+1; j<point.refs.length; j++)
      {
        var wallIdx1 = point.refs[i].lineIdx;
        var pointIdx1 = point.refs[i].pointIdx;
        var wallIdx2 = point.refs[j].lineIdx;
        var pointIdx2 = point.refs[j].pointIdx;
    
        var line1 = this.getBorderLine(wallIdx1, 0);
        var line2 = this.getBorderLine(wallIdx2, 1-Math.abs(pointIdx1-pointIdx2));
        line1.extend(pointIdx1, OFFSET);
        line2.extend(pointIdx2, OFFSET);
        var inter = Util.interLine(line1, line2);
        this.borders[wallIdx1][pointIdx1][1-pointIdx1] = inter;
        this.borders[wallIdx2][pointIdx2][pointIdx1] = inter.copy();
  
        line1 = this.getBorderLine(wallIdx1, 1);
        line2 = this.getBorderLine(wallIdx2, Math.abs(pointIdx1-pointIdx2));
        line1.extend(pointIdx1, OFFSET);
        line2.extend(pointIdx2, OFFSET);
        inter = Util.interLine(line1, line2);
        this.borders[wallIdx1][pointIdx1][pointIdx1] = inter;
        this.borders[wallIdx2][pointIdx2][1-pointIdx1] = inter.copy();
      }
    }
  }
}

export default WallManager;