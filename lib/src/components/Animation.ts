module asteroids.components {
	
	import Component = artemis.Component;
  export interface IAnimation {
    animate(time);
  }

	export class Animation extends Component {

    /** @type {string} */
    public static className = 'Animation';

    /**
     * initialize the component
     * @param animation
     */
		public initialize(animation:IAnimation) {
      this.animation = animation;
    }

    /** @type {Object} */
     public animation:IAnimation;
	}

  Animation.prototype.animation = null;
}
