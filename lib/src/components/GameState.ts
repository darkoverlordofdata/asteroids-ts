module asteroids.components {
	
	import Component = artemis.Component;

	export class GameState extends Component {

    /** @type {string} */
    public static className = 'GameState';

    /**
     *
     * @param lives
     * @param level
     */
		public initialize(lives:number=0, level:number=0) {
      this.lives = lives;
      this.level = level;
      this.hits = 0;
      this.playing = false;
    }

    public setForStart() {
      this.lives = 3;
      this.level = 0;
      this.hits = 0;
      this.playing = true;
    }

    /** @type {number} */
    public lives:number;
    /** @type {number} */
    public level:number;
    /** @type {number} */
    public hits:number;
    /** @type {boolean} */
    public playing:boolean;
	}

  GameState.prototype.lives = 0;
  GameState.prototype.level = 0;
  GameState.prototype.hits = 0;
  GameState.prototype.playing = false;
}
