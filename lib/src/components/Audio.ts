module asteroids.components {
	
	import Component = artemis.Component;

	export class Audio extends Component {

    /** @type {string} */
    public static className = 'Audio';

    /**
     * initialize the component
     */
		public initialize() {
      this.toPlay = [];
    }

    /** @type {Array<Object>} */
     public toPlay:Function[];
	}

  Audio.prototype.toPlay = null;
}
