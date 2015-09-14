module asteroids.components {
	
	import PooledComponent = artemis.PooledComponent;
  import Pooled = artemis.annotations.Pooled;

  @Pooled()
	export class Display extends PooledComponent {

    /** @type {string} */
    public static className = 'Display';

    /**
     * initialize the component
     * @param sprite
     */
		public initialize(sprite:Object=null) {
      this.sprite = sprite;
    }

    /** @type {Object} */
     public sprite:any;
	}

  Display.prototype.sprite = null;
}
