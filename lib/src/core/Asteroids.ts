/*+--------------------------------------------------------------------+
| Asteroids.ts
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
* Asteroids
*/
module asteroids {


  import AnimationSystem = asteroids.systems.AnimationSystem;
  import AudioSystem = asteroids.systems.AudioSystem;
  import BulletAgeSystem = asteroids.systems.BulletAgeSystem;
  import CollisionSystem = asteroids.systems.CollisionSystem;
  import DeathThroesSystem = asteroids.systems.DeathThroesSystem;
  import GameManager = asteroids.systems.GameManager;
  import GunControlSystem = asteroids.systems.GunControlSystem;
  import HudSystem = asteroids.systems.HudSystem;
  import MotionControlSystem = asteroids.systems.MotionControlSystem;
  import MovementSystem = asteroids.systems.MovementSystem;
  import RenderSystem = asteroids.systems.RenderSystem;
  import SystemPriorities = asteroids.systems.SystemPriorities;
  import WaitForStartSystem = asteroids.systems.WaitForStartSystem;
  import GameState = asteroids.components.GameState;

  import GameConfig = asteroids.GameConfig;
  import AsteroidTemplate = asteroids.templates.AsteroidTemplate;
  import BulletTemplate = asteroids.templates.BulletTemplate;
  import GameTemplate = asteroids.templates.GameTemplate;
  import SpaceshipTemplate = asteroids.templates.SpaceshipTemplate;
  import WaitTemplate = asteroids.templates.WaitTemplate;
  import KeyPoll = asteroids.ui.KeyPoll;

  import TrigLUT = artemis.utils.TrigLUT;
  import World = artemis.World;
  import EntitySystem = artemis.EntitySystem;
  import GroupManager = artemis.managers.GroupManager;
  import TagManager = artemis.managers.TagManager;

  export class Asteroids {

    /** @type {asteroids.components.GameState} */
    public state:GameState;

    /** @type {Object} */
    public monitor;

    /** @type {asteroids.systems.RenderSystem} */
    private renderSystem:RenderSystem;

    /** @type {CanvasRenderingContext2D} 2D Canvas*/
    public graphic;

    /** @type {artemis.World} Engine*/
    public world:World;

    /** @type {asteroids.ui.KeyPoll} */
    public keyPoll:KeyPoll;

    /** @type {asteroids.GameConfig}*/
    public config:GameConfig;

    /**
     * @constructor
     * @param {CanvasRenderingContext2D} graphic
     * @param {number} width
     * @param {number} height
     */
    constructor(graphic, width, height) {
      TrigLUT.init(true);
      EntitySystem.blackBoard.setEntry('2d', graphic);
      this.graphic = graphic;
      this.prepare(width, height);
    }

    /**
     *
     * @param {number} width
     * @param {number} height
     */
    public prepare(width, height) {

      var world = this.world = new World();
      var state = this.state = new GameState();
      var keyPoll = this.keyPoll = new KeyPoll(window);
      var config = this.config = new GameConfig(width, height);

      world.setManager(new GroupManager());
      world.setManager(new TagManager());
      world.setSystem(new WaitForStartSystem());
      world.setSystem(new GameManager(config));
      world.setSystem(new MotionControlSystem(keyPoll));
      world.setSystem(new GunControlSystem(keyPoll));
      world.setSystem(new BulletAgeSystem());
      world.setSystem(new DeathThroesSystem());
      world.setSystem(new MovementSystem(config));
      world.setSystem(new CollisionSystem());
      world.setSystem(new AnimationSystem());
      world.setSystem(new HudSystem());
      this.renderSystem = world.setSystem(new RenderSystem(this.graphic, config), true);
      world.setSystem(new AudioSystem());
      world.initialize();
      world.createEntityFromTemplate('start_game', state).addToWorld();
      world.createEntityFromTemplate('game', state).addToWorld();
      state.initialize();

    }

    /**
     * Start animation
     */
    public start() {
      var x, y;
      if (navigator['isCocoonJS']) {
        this.monitor = null;
      } else {
        x = Math.floor(this.config.width / 2) - 40;
        y = 0;
        this.monitor = new window["Stats"]();
        this.monitor["setMode"](0);
        this.monitor["domElement"].style.position = "absolute";
        this.monitor["domElement"].style.left = x + "px";
        this.monitor["domElement"].style.top = y + "px";
        document.body.appendChild(this.monitor["domElement"]);
      }

      var temp = 0;
      var previousTime = 0;
      var update = (delta:number) => {

        temp = previousTime || delta;
        previousTime = delta;

        this.monitor.begin();
        this.world.setDelta((delta - temp) * 0.001);
        this.world.process();
        this.renderSystem.process();
        requestAnimationFrame(update);
        this.monitor.end();

      };

      requestAnimationFrame(update);
    }

  }
}