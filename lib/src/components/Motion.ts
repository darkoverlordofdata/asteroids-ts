module asteroids.components {
	
	import Component = artemis.Component;
  import Point = asteroids.ui.Point;
  import PooledComponent = artemis.PooledComponent;
  import Pooled = artemis.annotations.Pooled;

  @Pooled()
	export class Motion extends PooledComponent {

    /** @type {string} */
    public static className = 'Motion';

    /**
     *
     * @param velocityX
     * @param velocityY
     * @param angularVelocity
     * @param damping
     */
		public initialize(velocityX, velocityY, angularVelocity, damping) {
      this.velocity = new Point(velocityX, velocityY);
      this.angularVelocity = angularVelocity;
      this.damping = damping;
    }

    /** @type {example.ui.Point} */
    public velocity:Point;
    /** @type {number} */
    public angularVelocity:number;
    /** @type {number} */
    public damping:number;
	}

  Motion.prototype.velocity = null;
  Motion.prototype.angularVelocity = 0;
  Motion.prototype.damping = 0;
}
