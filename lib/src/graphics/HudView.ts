module asteroids.graphics {

  export class HudView {

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

    /** @type {number}*/
    public score:number = 0;

    /** @type {number}*/
    public lives:number = 3;

    /** @type {Function}*/
    public drawScore:Function = null;

    /** @type {Function}*/
    public drawLives:Function = null;

    /**
     * @constructor
     * @param {CanvasRenderingContext2D} graphic
     */
    constructor(graphic) {
      this.graphic = graphic;
      this.drawScore = this.createScore;
      this.drawLives = this.createLives;
    }

    /**
     * draw the view
     */
    public draw = () => {
      this.drawScore();
      this.drawLives();
    };

    /**
     * @param {number} lives
     */
    public setLives = (lives) => {
      return this.lives = lives;
    };

    /**
     * @param {number} score
     */
    public setScore = (score) => {
      return this.score = score;
    };

    /**
     * draw the lives display
     */
    public createLives() {
      var l, s, x, y;
      this.graphic.save();
      this.graphic.beginPath();
      this.graphic.font = "bold 18px Helvetica";
      this.graphic.fillStyle = "#FFFFFF";  //FFFFFF'
      this.graphic.textAlign = "center";
      s = "LIVES: " + this.lives;
      l = this.graphic.measureText(s);
      x = l.width;
      y = 20;
      this.graphic.fillText(s, x, y);
      this.graphic.fill();
      this.graphic.restore();
    }

    /**
     * draw the score display
     */
    public createScore() {
      var l, s, x, y;
      this.graphic.save();
      this.graphic.beginPath();
      this.graphic.font = "bold 18px Helvetica";
      this.graphic.fillStyle = "#FFFFFF";  //FFFFFF'
      this.graphic.textAlign = "center";
      s = "SCORE: " + this.score;
      l = this.graphic.measureText(s);
      x = (window.window.innerWidth * window.devicePixelRatio) - l.width;
      y = 20;
      this.graphic.fillText(s, x, y);
      this.graphic.fill();
      this.graphic.restore();
    }
  }
}