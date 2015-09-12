module asteroids.components {
	
	import Component = artemis.Component;

	export class DeathThroes extends Component {

    /** @type {string} */
    public static className = 'DeathThroes';

    /**
     * initialize the component
     * @param duration
     */
		public initialize(duration:number=0) {
      this.duration = duration;
    }

    /** @type {number} */
     public duration:number;
	}

  DeathThroes.prototype.duration = 0;
}
