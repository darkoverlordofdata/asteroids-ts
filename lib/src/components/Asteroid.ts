module asteroids.components {
	
	import Component = artemis.Component;

	export class Asteroid extends Component {

    /** @type {string} */
    public static className = 'Asteroid';

    /**
     * initialize the component
     * @param fsm
     */
		public initialize(fsm:Object=null) {
      this.fsm = fsm;
    }

    /** @type {Object} */
     public fsm:Object;
	}

  Asteroid.prototype.fsm = null;
}
