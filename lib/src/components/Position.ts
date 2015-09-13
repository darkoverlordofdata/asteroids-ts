module asteroids.components {
	
	import Component = artemis.Component;
  import Point = asteroids.ui.Point;
  import PooledComponent = artemis.PooledComponent;
  import Pooled = artemis.annotations.Pooled;

  @Pooled()
	export class Position extends PooledComponent {

    /** @type {string} */
    public static className = 'Position';

    /**
     *
     * @param x
     * @param y
     * @param r
     */
		public initialize(x, y, r=0) {
      this.position = new Point(x, y);
      this.rotation = r;
    }

    /** @type {example.ui.Point} */
    public position:Point;
    public rotation:number;
	}

  Position.prototype.position = null;
  Position.prototype.rotation = 0;
}
