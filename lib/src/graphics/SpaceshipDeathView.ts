module asteroids.graphics {

  import Point = asteroids.ui.Point;
  import IAnimation = asteroids.components.IAnimation;

  export class SpaceshipDeathView implements IAnimation {

    /** @type {number}*/
    public x:number = 0;

    /** @type {number}*/
    public y:number = 0;

    /** @type {number}*/
    public width:number = 20;

    /** @type {number}*/
    public height:number = 20;

    /** @type {number}*/
    public rotation:number = 0;

    /** @type {number}*/
    public r1:number = 0;

    /** @type {number}*/
    public r2:number = 0;

    /** @type {CanvasRenderingContext2D}*/
    public graphic = null;

    /** @type {asteroids.ui.Point}*/
    public vel1:Point = null;

    /** @type {asteroids.ui.Point}*/
    public vel2:Point = null;

    /** @type {number}*/
    public rot1:number = null;

    /** @type {number}*/
    public rot2:number = null;

    /** @type {number}*/
    public x1:number = 0;

    /** @type {number}*/
    public x2:number = 0;

    /** @type {number}*/
    public y1:number = 0;

    /** @type {number}*/
    public y2:number = 0;

    /** @type {boolean}*/
    public first:boolean = true;

    /**
     * @constructor
     * @param {CanvasRenderingContext2D} graphic
     */
    constructor(graphic) {
      this.graphic = graphic;
    }

    /**
     * @param {number} time
     */
    public animate(time) {
      if (this.first) {
        this.first = false;
        this.vel1 = new Point(Math.random() * 10 - 5, Math.random() * 10 + 10);
        this.vel2 = new Point(Math.random() * 10 - 5, -(Math.random() * 10 + 10));
        this.rot1 = Math.random() * 300 - 150;
        this.rot2 = Math.random() * 300 - 150;
        this.x1 = this.x2 = this.x;
        this.y1 = this.y2 = this.y;
        this.r1 = this.r2 = this.rotation;
      }

      this.x1 += this.vel1.x * time;
      this.y1 += this.vel1.y * time;
      this.r1 += this.rot1 * time;

      this.x2 += this.vel2.x * time;
      this.y2 += this.vel2.y * time;
      this.r2 += this.rot2 * time;
      return this.draw();
    }

    /**
     * draw the view
     */
    public draw() {
      var graphic = this.graphic;

      // shape1
      graphic.save();
      graphic.beginPath();
      graphic.translate(this.x + this.x1, this.y + this.y1);
      graphic.rotate(this.r1);
      graphic.fillStyle = "#FFFFFF";
      graphic.moveTo(10, 0);
      graphic.lineTo(-7, 7);
      graphic.lineTo(-4, 0);
      graphic.lineTo(10, 0);
      graphic.fill();
      graphic.restore();

      // shape2
      graphic.save();
      graphic.beginPath();
      graphic.translate(this.x + this.x2, this.y + this.y2);
      graphic.rotate(this.r2);
      graphic.fillStyle = "#FFFFFF";
      graphic.moveTo(10, 0);
      graphic.lineTo(-7, 7);
      graphic.lineTo(-4, 0);
      graphic.lineTo(10, 0);
      graphic.fill();
      graphic.restore();

    }
  }
}