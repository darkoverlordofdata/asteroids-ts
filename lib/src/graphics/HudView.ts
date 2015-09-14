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
    public graphic:CanvasRenderingContext2D = null;

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
     * @param {CanvasRenderingContext2D} graphic
     */
    public draw = (graphic) => {
      this.drawScore(graphic);
      this.drawLives(graphic);
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
    public createLives(graphic) {

      graphic.save();
      graphic.beginPath();
      graphic.font = "bold 18px Helvetica";
      graphic.fillStyle = "#FFFFFF";  //FFFFFF'
      graphic.textAlign = "center";
      var s = "LIVES: " + this.lives;
      var l = graphic.measureText(s);
      var x = l.width;
      var y = 20;
      graphic.fillText(s, ~~x, ~~y);
      graphic.fill();
      graphic.restore();
    }

    /**
     * draw the score display
     */
    public createScore(graphic:CanvasRenderingContext2D) {

      graphic.save();
      graphic.beginPath();
      graphic.font = "bold 18px Helvetica";
      graphic.fillStyle = "#FFFFFF";  //FFFFFF'
      graphic.textAlign = "center";
      var s = "SCORE: " + this.score;
      var l = graphic.measureText(s);
      var x = (window.window.innerWidth * window.devicePixelRatio) - l.width;
      var y = 20;
      graphic.fillText(s, ~~x, ~~y);
      graphic.fill();
      graphic.restore();
    }
  }
}