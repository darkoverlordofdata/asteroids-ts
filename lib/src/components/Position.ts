module asteroids.components {
	
	import Component = artemis.Component;
  import Point = asteroids.ui.Point;

	export class Position extends Component {

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
