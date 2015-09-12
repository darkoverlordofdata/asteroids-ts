module asteroids.components {
	
	import Component = artemis.Component;

	export class Hud extends Component {

    /** @type {string} */
    public static className = 'Hud';

    /**
     * initialize the component
     * @param view
     */
		public initialize(view:Object=null) {
      this.view = view;
    }

    /** @type {Object} */
     public view:Object;
	}

  Hud.prototype.view = null;
}
