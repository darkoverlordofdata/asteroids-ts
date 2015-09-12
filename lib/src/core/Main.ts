/*+--------------------------------------------------------------------+
| Main.ts
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
* Main entry point
*/
module asteroids {

  import Asteroids = asteroids.Asteroids;

  export class Main {

    /**
     * Create a new game
     * @constructor
     */
    constructor() {
      var canvas = Main.createCanvas();
      new Asteroids(canvas.getContext('2d'), canvas.width, canvas.height).start();
    }

    /**
     * Create the canvas
     * @return {HTMLCanvasElement}
     */
    public static createCanvas() {
      var canvas;
      canvas = document.createElement(navigator['isCocoonJS'] ? 'screencanvas' : 'canvas');
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.backgroundColor = '#000000';
      document.body.appendChild(canvas);
      return canvas;
    }
  }
}