module asteroids.ui {

  export class Point {

    /** @type {number}*/
    public x:number = 0;

    /** @type {number}*/
    public y:number = 0;

    /**
     * @constructor
     * @param x {number}
     * @param y {number}
    */
    constructor(x : number = 0, y : number = 0) {
      this.x = x;
      this.y = y;
    }

    /**
     * @param {Point} point1
     * @param {Point} point2
    */
    public static distance(point1, point2) {
      var dx, dy;
      dx = point1.x - point2.x;
      dy = point1.y - point2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * @param {Point} targetPoint
     * @return {number}
    */
    public distanceSquaredTo(targetPoint) {
      var dx, dy;
      dx = this.x - targetPoint.x;
      dy = this.y - targetPoint.y;
      return dx * dx + dy * dy;
    }

    /**
     * @param {Point} targetPoint
     * @return {number}
    */
    public distanceTo(targetPoint) {
      var dx, dy;
      dx = this.x - targetPoint.x;
      dy = this.y - targetPoint.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }
}
