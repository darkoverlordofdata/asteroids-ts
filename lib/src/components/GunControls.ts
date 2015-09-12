module asteroids.components {
	
	import Component = artemis.Component;

	export class GunControls extends Component {

    /** @type {string} */
    public static className = 'GunControls';

    /**
     * initialize the component
     * @param trigger
     */
		public initialize(trigger:number=0) {
      this.trigger = trigger;
    }

    /** @type {number} */
     public trigger:number;
	}

  GunControls.prototype.trigger = 0;
}
