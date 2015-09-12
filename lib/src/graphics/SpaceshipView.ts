module asteroids.graphics {

  export class SpaceshipView {

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
      graphic.translate(this.x, this.y);
      graphic.rotate(this.rotation);
      graphic.fillStyle = "#FFFFFF";
      graphic.moveTo(10, 0);
      graphic.lineTo(-7, 7);
      graphic.lineTo(-4, 0);
      graphic.lineTo(-7, -7);
      graphic.lineTo(10, 0);
      graphic.fill();
      graphic.restore();
    }
  }
}