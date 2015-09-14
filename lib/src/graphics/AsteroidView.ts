module asteroids.graphics {

  const Tau = Math.PI * 2;

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
    public graphic:CanvasRenderingContext2D = null;

    public image:HTMLCanvasElement;

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
    constructor(graphic:CanvasRenderingContext2D, radius) {
      var angle, length, posX, posY;
      this.graphic = graphic;
      this.radius = radius;
      this.width = this.radius;
      this.height = this.radius;
      this.points = [];
      angle = 0;
      while (angle < Tau) {
        length = (0.75 + Math.random() * 0.25) * this.radius;
        posX = ~~((Math.cos(angle) * length)+0.5);
        posY = ~~((Math.sin(angle) * length)+0.5);
        this.points.push(new Point(posX, posY));
        angle += Math.random() * 0.5;
      }

      //this.image = document.createElement('canvas');
      //this.image.width = this.width*2;
      //this.image.height = this.height*2;
      //this.draw(this.image.getContext('2d'));
    }

    /**
     * draw the view
     * @param {CanvasRenderingContext2D} graphic
     */
    public draw(graphic:CanvasRenderingContext2D) {

      graphic.save();
      graphic.beginPath();
      graphic.translate(this.x, this.y);
      graphic.rotate(this.rotation);
      graphic.fillStyle = "#FFFFFF";
      graphic.moveTo(this.radius, 0);

      var i = 0;
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