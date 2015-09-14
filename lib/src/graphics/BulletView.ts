module asteroids.graphics {

  const Tau = Math.PI * 2;

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
    public graphic:CanvasRenderingContext2D = null;

    /**
     * @constructor
     * @param {CanvasRenderingContext2D} graphic
     */
    constructor(graphic:CanvasRenderingContext2D) {
      this.graphic = graphic;
    }

    /**
     * draw the view
     * @param {CanvasRenderingContext2D} graphic
     */
    public draw(graphic:CanvasRenderingContext2D) {

      graphic.save();
      graphic.beginPath();
      graphic.rotate(this.rotation);
      graphic.fillStyle = '#FFFFFF';
      graphic.arc(~~this.x, ~~this.y, 2, 0, Tau, false);
      graphic.fill();
      graphic.restore();
    }
  }
}