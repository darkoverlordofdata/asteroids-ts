module asteroids.graphics {

  import Point = asteroids.ui.Point;
  import IAnimation = asteroids.components.IAnimation;

  export class AsteroidDeathView implements IAnimation {

    /** @const*/
    static numDots:number = 8;

    /** @type {Array<Dot>}*/
    public dots:Dot[] = null;

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

    /** @type {asteroids.ui.Point}*/
    public points:Point = null;

    /** @type {number}*/
    public count:number = 0;

    /** @type {boolean}*/
    public first:boolean = true;

    /**
     * @constructor
     * @param {CanvasRenderingContext2D} graphic
     * @param {number} radius
     */
    constructor(graphic, radius) {
      this.graphic = graphic;
      this.radius = radius;
      this.dots = [];
    }

    /**
     * @param {number} time
     */
    public animate(time) {
      var dot;
      if (this.first) {
        this.first = false;
        for (var i=0; i<AsteroidDeathView.numDots; i++) {
          dot = new Dot(this.graphic, this.radius, this.rotation);
          this.dots.push(dot);
        }
      }

      this.dots.forEach((dot) => {
        dot.x += dot.velocity.x * time;
        return dot.y += dot.velocity.y * time;
      });
      return this.draw();
    }

    /**
     * draw the view
     */

    public draw() {
      return this.dots.map((dot) => dot.draw(this.x, this.y));
    }
  }

   class Dot {

    /** @type {asteroids.ui.Point}*/
    public velocity:Point = null;

    /** @type {CanvasRenderingContext2D}*/
    public graphic = null;

     /** @type {number}*/
     public rotation:number = 0;

     /** @type {number}*/
    public x1:number = 0;

    /** @type {number}*/
    public y1:number = 0;

    /** @type {number}*/
    public x:number = 0;

    /** @type {number}*/
    public y:number = 0;

    /**
     * @constructor
     * @param {CanvasRenderingContext2D} graphic
     * @param {number} maxDistance
     * @param {number} rotation
     */
    constructor(graphic, maxDistance, rotation) {
      var angle, distance, speed;
      this.graphic = graphic;
      this.rotation = rotation;
      angle = Math.random() * 2 * Math.PI;
      distance = Math.random() * maxDistance;
      this.x = Math.cos(angle) * distance;
      this.y = Math.sin(angle) * distance;
      speed = Math.random() * 10 + 10;
      this.velocity = new Point(Math.cos(angle) * speed, Math.sin(angle) * speed);
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    public draw(x, y) {
      var graphic;
      graphic = this.graphic;
      graphic.save();
      graphic.beginPath();
      graphic.translate(x, y);
      graphic.rotate(this.rotation);
      graphic.fillStyle = "#FFFFFF";
      graphic.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
      graphic.fill();
      graphic.restore();
    }
  }
}

