module asteroids.graphics {

  import Point = asteroids.ui.Point;

  export class AsteroidView {

    /** @type {number}*/
    public x:number = 0;

    /** @type {number}*/
    public y:number = 0;

    /** @type {number}*/
    public width:number = 0;

    /** @type {number}*/
    public height:number = 0;

    /** @type {number}*/
    public rotation:number = 0;

    /** @type {CanvasRenderingContext2D}*/
    public graphic = null;

    /** @type {number}*/
    public radius:number = 0;

    /** @type {Array<asteroids.ui.Point>}*/
    public points:Array<Point> = null;

    /** @type {number}*/
    public count:number = 0;

    /**
     * @constructor
     * @param {CanvasRenderingContext2D} graphic
     * @param {number} radius
     */
    constructor(graphic, radius) {
      var angle, length, posX, posY;
      this.graphic = graphic;
      this.radius = radius;
      this.width = this.radius;
      this.height = this.radius;
      this.points = [];
      angle = 0;
      while (angle < Math.PI * 2) {
        length = (0.75 + Math.random() * 0.25) * this.radius;
        posX = Math.cos(angle) * length;
        posY = Math.sin(angle) * length;
        this.points.push(new Point(this.x, this.y));

        angle += Math.random() * 0.5;
      }
    }

    /**
     * draw the view
     */
    public draw() {
      var graphic, i;
      graphic = this.graphic;
      graphic.save();
      graphic.beginPath();
      graphic.translate(this.x, this.y);
      graphic.rotate(this.rotation);
      graphic.fillStyle = "#FFFFFF";
      graphic.moveTo(this.radius, 0);
      i = 0;

      while (i < this.points.length) {
        graphic.lineTo(this.points[i].x, this.points[i].y);
        ++i;
      }
      graphic.lineTo(this.radius, 0);
      graphic.fill();
      graphic.restore();
    }
  }
}