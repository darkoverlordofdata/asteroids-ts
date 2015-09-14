module asteroids.graphics {

  import Signal0 = artemis.signals.Signal0;

  export class WaitForStartView {

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

    /** @type {Function}*/
    public gameOver:Function = null;

    /** @type {Function}*/
    public clickToStart:Function = null;

    /** @type {Function}*/
    public instructions:Function = null;

    /** @type {artemis.signals.Signal0}*/
    public click:Signal0 = null;

    /**
     * @constructor
     * @param {CanvasRenderingContext2D} graphic
     */
    constructor(graphic:CanvasRenderingContext2D) {
      this.graphic = graphic;
      this.click = new Signal0();
      this.gameOver = this.createGameOver;
      this.instructions = this.createInstructions;
      this.clickToStart = this.createClickToStart;
      this.graphic.canvas.addEventListener('click', (event) => this.click.dispatch());
    }

    /**
     * draw the game over button
     * @param {CanvasRenderingContext2D} graphic
     */
    public createGameOver(graphic:CanvasRenderingContext2D) {

      graphic.save();
      graphic.beginPath();
      graphic.font = 'bold 32px Helvetica';
      graphic.fillStyle = '#FFFFFF';

      var s = 'ASTEROIDS';
      var l = graphic.measureText(s);
      var x = Math.floor(((window.innerWidth * window.devicePixelRatio) - l.width) / 2);
      var y = 175;
      graphic.fillText(s, ~~x, ~~y);
      graphic.fill();
      graphic.restore();
    }

    /**
     * draw the start button
     * @param {CanvasRenderingContext2D} graphic
     */
    public createClickToStart(graphic:CanvasRenderingContext2D) {

      graphic.save();
      graphic.beginPath();
      graphic.font = 'bold 18px Helvetica';
      graphic.fillStyle = '#FFFFFF';

      var s = 'CLICK TO START';
      var l = graphic.measureText(s);
      var x = Math.floor(((window.innerWidth * window.devicePixelRatio) - l.width) / 2);
      var y = 225;
      graphic.fillText(s, ~~x, ~~y);
      graphic.fill();
      graphic.restore();
    }

    /**
     * draw the instructions
     * @param {CanvasRenderingContext2D} graphic
     */
    public createInstructions(graphic:CanvasRenderingContext2D) {

      graphic.save();
      graphic.beginPath();
      graphic.font = 'bold 14px Helvetica';
      graphic.fillStyle = '#FFFFFF';

      var s = 'CTRL-Z to Fire  ~  Arrow Keys to Move';
      var x = 10;
      var y = window.innerHeight * window.devicePixelRatio - 20;
      graphic.fillText(s, ~~x, ~~y);
      graphic.fill();
      graphic.restore();
    }

    /**
     * draw the view
     */
    public draw(graphic:CanvasRenderingContext2D) {
      this.gameOver(graphic);
      this.clickToStart(graphic);
      this.instructions(graphic);
    }
  }
}