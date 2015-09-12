module asteroids.components {
	
	import Component = artemis.Component;

	export class Display extends Component {

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
     public graphic:Object;
	}

  Display.prototype.graphic = null;
}
