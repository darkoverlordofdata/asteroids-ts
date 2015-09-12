module asteroids.components {
	
	import Component = artemis.Component;

	export class MotionControls extends Component {

    /** @type {string} */
    public static className = 'MotionControls';


    /**
     *
     * @param left
     * @param right
     * @param accelerate
     * @param accelerationRate
     * @param rotationRate
     */
    public initialize(left, right, accelerate, accelerationRate, rotationRate) {
      this.left = left;
      this.right = right;
      this.accelerate = accelerate;
      this.accelerationRate = accelerationRate;
      this.rotationRate = rotationRate;
    }

    /** @type {number} */
    public left:number;
    /** @type {number} */
    public right:number;
    /** @type {number} */
    public accelerate:number;
    /** @type {number} */
    public accelerationRate:number;
    /** @type {number} */
    public rotationRate:number;
	}

  MotionControls.prototype.left = 0;
  MotionControls.prototype.right = 0;
  MotionControls.prototype.accelerate = 0;
  MotionControls.prototype.accelerationRate = 0;
  MotionControls.prototype.rotationRate = 0;
}
