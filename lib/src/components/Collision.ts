module asteroids.components {
	
	import Component = artemis.Component;
  import PooledComponent = artemis.PooledComponent;
  import Pooled = artemis.annotations.Pooled;

  @Pooled()
	export class Collision extends PooledComponent {

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
