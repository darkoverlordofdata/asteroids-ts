module asteroids.components {
	
	import Component = artemis.Component;

	export class DeathThroes extends Component {

    /** @type {string} */
    public static className = 'DeathThroes';

    /**
     * initialize the component
     * @param duration
     * @param callback
     */
		public initialize(duration:number=0, callback?:Function) {
      this.duration = duration;
      if (callback) {
        this.callback = callback;
      }
    }

    /** @type {number} */
    public duration:number;
    public callback:Function;
	}

  DeathThroes.prototype.duration = 0;
  DeathThroes.prototype.callback = null;
}
