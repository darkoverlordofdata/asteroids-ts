module asteroids.components {
	
	import Component = artemis.Component;
  import HudView = asteroids.graphics.HudView;

	export class Hud extends Component {

    /** @type {string} */
    public static className = 'Hud';

    /**
     * initialize the component
     * @param view
     */
		public initialize(view:HudView) {
      this.view = view;
    }

    /** @type {Object} */
     public view:HudView;
	}

  Hud.prototype.view = null;
}
