module asteroids.graphics {

  export class BulletView {

    /** @type {number}*/
    public x:number = 0;

    /** @type {number}*/
    public y:number = 0;

    /** @type {number}*/
    public width:number = 4;

    /** @type {number}*/
    public height:number = 4;

    /** @type {number}*/
    public rotation:number = 0;

    /** @type {CanvasRenderingContext2D}*/
    public graphic = null;

    /**
     * @constructor
     * @param {CanvasRenderingContext2D} graphic
     */
    constructor(graphic) {
      this.graphic = graphic;
    }

    /**
     * draw the view
     */
    public draw() {
      var graphic;
      graphic = this.graphic;
      graphic.save();
      graphic.beginPath();
      graphic.rotate(this.rotation);
      graphic.fillStyle = "#FFFFFF";
      graphic.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
      graphic.fill();
      graphic.restore();
    }
  }
}