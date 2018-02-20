import Util from './Util';

var POWER_OFFSET = 100;
var OFFSET = 10;

class WallManager {
  constructor()
  {
    this.instance = null;
    this.walls = [];
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
    this.mergePoint(line);
    //this.walls.push(line);
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
          if (Util.getDistance([line[i], this.walls[j][k]], true) < POWER_ERROR)
          {
            this.walls[j][k] = Util.inter(line, this.walls[j]);
            line[i] = this.walls[j][k];
            merged = true;
            break;
          }
        }
      }
    }
  }

  connect(p1, p2)
  {

  }
}

export default WallManager;