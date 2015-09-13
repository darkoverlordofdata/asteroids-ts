module asteroids.components {
	
	import PooledComponent = artemis.PooledComponent;
  import Pooled = artemis.annotations.Pooled;

  @Pooled()
	export class Bullet extends PooledComponent {

    /** @type {string} */
    public static className = 'Bullet';

    /**
     * initialize the component
     * @param lifeRemaining
     */
		public initialize(lifeRemaining:number=0) {
      this.lifeRemaining = lifeRemaining;
    }

    /** @type {number} */
     public lifeRemaining:number;
	}

  Bullet.prototype.lifeRemaining = 0;
}
