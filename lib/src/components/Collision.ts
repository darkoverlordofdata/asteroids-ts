module asteroids.components {
	
	import Component = artemis.Component;

	export class Collision extends Component {

    /** @type {string} */
    public static className = 'Collision';

    /**
     * initialize the component
     * @param radius
     */
		public initialize(radius:number=0) {
      this.radius = radius;
    }

    /** @type {number} */
     public radius:number;
	}

  Collision.prototype.radius = 0;
}
