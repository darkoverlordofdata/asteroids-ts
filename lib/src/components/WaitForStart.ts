module asteroids.components {
	
	import Component = artemis.Component;

	export class WaitForStart extends Component {

    /** @type {string} */
    public static className = 'WaitForStart';

    /**
     *
     * @param waitForStart
     */
		public initialize(waitForStart) {
      this.waitForStart = waitForStart;
      this.waitForStart.click.add(this.setStartGame)
    }
    public setStartGame = () => {
      this.startGame = true;
    };

    /** @type {Object} */
     public waitForStart:any;
    /** @type {boolean} */
    public startGame:boolean;
	}

  WaitForStart.prototype.waitForStart = null;
  WaitForStart.prototype.startGame = false;
}
