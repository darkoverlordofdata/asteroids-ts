module asteroids.components {
	
	import Component = artemis.Component;
  import Point = asteroids.ui.Point;

	export class Gun extends Component {

    /** @type {string} */
    public static className = 'Gun';

    /**
     *
     * @param offsetX
     * @param offsetY
     * @param minimumShotInterval
     * @param bulletLifetime
     */
		public initialize(offsetX?, offsetY?, minimumShotInterval?, bulletLifetime?) {
      this.offsetFromParent = new Point(offsetX, offsetY);
      this.minimumShotInterval = minimumShotInterval;
      this.bulletLifetime = bulletLifetime;
      this.timeSinceLastShot = 0;
      this.shooting = false;
    }

    /** @type {example.ui.Point} */
    public offsetFromParent:Point;
    /** @type {number} */
    public timeSinceLastShot:number;
    /** @type {number} */
    public minimumShotInterval:number;
    /** @type {number} */
    public bulletLifetime:number;
    /** @type {boolean} */
    public shooting:boolean;
	}

  Gun.prototype.offsetFromParent = null;
  Gun.prototype.timeSinceLastShot = 0;
  Gun.prototype.minimumShotInterval = 0;
  Gun.prototype.bulletLifetime = 0;
  Gun.prototype.shooting = false;
}
