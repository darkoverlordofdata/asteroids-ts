module asteroids.components {
	
	import Component = artemis.Component;

	export class Spaceship extends Component {

    /** @type {string} */
    public static className = 'Spaceship';

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

  Spaceship.prototype.fsm = null;
}
