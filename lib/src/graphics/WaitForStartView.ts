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
    public graphic = null;

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
    constructor(graphic) {
      this.graphic = graphic;
      this.click = new Signal0();
      this.gameOver = this.createGameOver;
      this.instructions = this.createInstructions;
      this.clickToStart = this.createClickToStart;
      this.graphic.canvas.addEventListener('click', (event) => this.click.dispatch());
    }

    /**
     * draw the game over button
     */
    public createGameOver() {
      var l, s, x, y;
      this.graphic.save();
      this.graphic.beginPath();
      this.graphic.font = 'bold 32px Helvetica';
      this.graphic.fillStyle = '#FFFFFF';

      s = 'ASTEROIDS';
      l = this.graphic.measureText(s);
      x = Math.floor(((window.innerWidth * window.devicePixelRatio) - l.width) / 2);
      y = 175;
      this.graphic.fillText(s, x, y);
      this.graphic.fill();
      this.graphic.restore();
    }

    /**
     * draw the start button
     */
    public createClickToStart() {
      var l, s, x, y;
      this.graphic.save();
      this.graphic.beginPath();
      this.graphic.font = 'bold 18px Helvetica';
      this.graphic.fillStyle = '#FFFFFF';

      s = 'CLICK TO START';
      l = this.graphic.measureText(s);
      x = Math.floor(((window.innerWidth * window.devicePixelRatio) - l.width) / 2);
      y = 225;
      this.graphic.fillText(s, x, y);
      this.graphic.fill();
      this.graphic.restore();
    }

    /**
     * draw the instructions
     */
    public createInstructions() {
      var l, s, x, y;
      this.graphic.save();
      this.graphic.beginPath();
      this.graphic.font = 'bold 14px Helvetica';
      this.graphic.fillStyle = '#FFFFFF';

      s = 'CTRL-Z to Fire  ~  Arrow Keys to Move';
      x = 10;
      y = window.innerHeight * window.devicePixelRatio - 20;
      this.graphic.fillText(s, x, y);
      this.graphic.fill();
      this.graphic.restore();
    }

    /**
     * draw the view
     */
    public draw() {
      this.gameOver();
      this.clickToStart();
      this.instructions();
    }
  }
}