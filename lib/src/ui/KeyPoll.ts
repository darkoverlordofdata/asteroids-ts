module asteroids.ui {

  export class KeyPoll {

    /** @type {Object.<string, boolean>}*/
    public states = null;


    /**
     * @constructor
     * @param {Window} displayObj
     */
    constructor(displayObj) {
      this.states = {};
      displayObj.addEventListener('keydown', this.keyDownListener);
      displayObj.addEventListener('keyup', this.keyUpListener);
    }

    /**
     * @private
     * @param {KeyboardEvent} event
     */
    public keyDownListener = (event) => {
      this.states[event.keyCode] = true;
    };

    /**
     * @private
     * @param {KeyboardEvent} event
     */
    public keyUpListener = (event) => {
      if (this.states[event.keyCode]) {
        this.states[event.keyCode] = false;
      }
    };

    /**
     * @param {string} keyCode
     * @return {boolean}
     */
    public isDown = (keyCode) => {
      return this.states[keyCode];
    };

    /**
     * @param {string} keyCode
     * @return {boolean}
     */
    public isUp = (keyCode) => {
      return !this.states[keyCode];
    }
  }
}

