module asteroids.components {
	
	import Component = artemis.Component;

	export class Bullet extends Component {

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
