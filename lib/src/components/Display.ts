module asteroids.components {
	
	import PooledComponent = artemis.PooledComponent;
  import Pooled = artemis.annotations.Pooled;

  @Pooled()
	export class Display extends PooledComponent {

    /** @type {string} */
    public static className = 'Display';

    /**
     * initialize the component
     * @param graphic
     */
		public initialize(graphic:Object=null) {
      this.graphic = graphic;
    }

    /** @type {Object} */
     public graphic:any;
	}

  Display.prototype.graphic = null;
}
