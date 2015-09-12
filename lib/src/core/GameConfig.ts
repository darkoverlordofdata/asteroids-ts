/*+--------------------------------------------------------------------+
| GameConfig.ts
+--------------------------------------------------------------------+
| Copyright DarkOverlordOfData (c) 2015
+--------------------------------------------------------------------+
|
| This file is a part of asteroids-ts
|
| asteroids-ts is free software; you can copy, modify, and distribute
| it under the terms of the MIT License
|
+--------------------------------------------------------------------+
*
* GameConfig
*/
module asteroids {

  /**
   * @constructor
   */
  export class GameConfig {

    /** @type {number}*/
    public width = 0;

    /** @type {number}*/
    public height = 0;

    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
  }
}