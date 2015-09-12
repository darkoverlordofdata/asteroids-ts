module asteroids.components {
	
	import Component = artemis.Component;

	export class Animation extends Component {

    /** @type {string} */
    public static className = 'Animation';

    /**
     * initialize the component
     * @param animation
     */
		public initialize(animation:Object=null) {
      this.animation = animation;
    }

    /** @type {Object} */
     public animation:Object;
	}

  Animation.prototype.animation = null;
}
