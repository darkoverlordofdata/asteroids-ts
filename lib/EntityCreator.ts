//+--------------------------------------------------------------------+
//| entity_creator.coffee
//+--------------------------------------------------------------------+
//| Copyright DarkOverlordOfData (c) 2015
//+--------------------------------------------------------------------+
//|
//| This file is a part of ash.coffee
//|
//| ash.coffee is free software; you can copy, modify, and distribute
//| it under the terms of the MIT License
//|
//+--------------------------------------------------------------------+
//
// EntityCreator
//
module asteroids {

  import Entity = ash.core.Entity;
  import EntityStateMachine = ash.fsm.EntityStateMachine;
  import Animation = asteroids.components.Animation;
  import Asteroid = asteroids.components.Asteroid;
  import Audio = asteroids.components.Audio;
  import Bullet = asteroids.components.Bullet;
  import Collision = asteroids.components.Collision;
  import DeathThroes = asteroids.components.DeathThroes;
  import Display = asteroids.components.Display;
  import GameState = asteroids.components.GameState;
  import Gun = asteroids.components.Gun;
  import GunControls = asteroids.components.GunControls;
  import Hud = asteroids.components.Hud;
  import Motion = asteroids.components.Motion;
  import MotionControls = asteroids.components.MotionControls;
  import Position = asteroids.components.Position;
  import Spaceship = asteroids.components.Spaceship;
  import WaitForStart = asteroids.components.WaitForStart;
  import AsteroidDeathView = asteroids.graphics.AsteroidDeathView;
  import AsteroidView = asteroids.graphics.AsteroidView;
  import BulletView = asteroids.graphics.BulletView;
  import HudView = asteroids.graphics.HudView;
  import SpaceshipDeathView = asteroids.graphics.SpaceshipDeathView;
  import SpaceshipView = asteroids.graphics.SpaceshipView;
  import WaitForStartView = asteroids.graphics.WaitForStartView;

  const KEY_LEFT = 37;
  const KEY_UP = 38;
  const KEY_RIGHT = 39;
  const KEY_Z = 90;

  export class EntityCreator {
    /** @const*/

    /** @const*/

    /** @const*/

    /** @const*/


    /** @type {ash.core.Engine} Engine*/

    public engine = null;

    /** @type {asteroids.graphics.WaitForStartView}*/

    public waitEntity = null;

    /** @type {CanvasRenderingContext2D}*/

    public graphic = null;

    /**
     * @constructor
     * @param {ash.core.Engine}
     * @param {CanvasRenderingContext2D}
     * @param {Object} b2World (undefined)
     */

    constructor(public engine, public graphic, public world) {
    }

    /**
     * @param {ash.core.Entity} entity to destroy
     */

    public destroyEntity(entity) {
      this.engine.removeEntity(entity);
    }

    /**
     * create game
     * @return {ash.core.Entity}
     */

    public createGame() {
      var gameEntity, hud;
      hud = new HudView(this.graphic);
      gameEntity = new Entity("game").add(new GameState()).add(new Hud(hud)).add(new Display(hud)).add(new Position(0, 0, 0, 0));
      this.engine.addEntity(gameEntity);
      return gameEntity;
    }

    /**
     * Create the Start Button
     * @return {ash.core.Entity}
     */

    public createWaitForClick() {
      var waitView;
      if (!this.waitEntity) {
        waitView = new WaitForStartView(this.graphic);
        this.waitEntity = new Entity("wait").add(new WaitForStart(waitView)).add(new Display(waitView)).add(new Position(0, 0, 0, 0));
      }

      this.waitEntity.get(WaitForStart).startGame = false;
      this.engine.addEntity(this.waitEntity);
      return this.waitEntity;
    }

    /**
     * Create an Asteroid with FSM Animation
     * @param {number} radius
     * @param {number} x
     * @param {number} y
     * @return {ash.core.Entity}
     */

    public createAsteroid(radius, x, y) {
      var asteroid, deathView, fsm;
      asteroid = new Entity();
      fsm = new EntityStateMachine(asteroid);

      fsm.createState("alive").add(Motion).withInstance(new Motion((Math.random() - 0.5) * 4 * (50 - radius), (Math.random() - 0.5) * 4 * (50 - radius), Math.random() * 2 - 1, 0)).add(Collision).withInstance(new Collision(radius)).add(Display).withInstance(new Display(new AsteroidView(this.graphic, radius)));

      deathView = new AsteroidDeathView(this.graphic, radius);
      fsm.createState("destroyed").add(DeathThroes).withInstance(new DeathThroes(3)).add(Display).withInstance(new Display(deathView)).add(Animation).withInstance(new Animation(deathView));

      asteroid.add(new Asteroid(fsm)).add(new Position(x, y, 0)).add(new Audio());

      fsm.changeState("alive");
      this.engine.addEntity(asteroid);
      return asteroid;
    }

    /**
     * Create Player Spaceship with FSM Animation
     * @return {ash.core.Entity}
     */

    public createSpaceship() {
      var deathView, fsm, spaceship;
      spaceship = new Entity();
      fsm = new EntityStateMachine(spaceship);

      fsm.createState("playing").add(Motion).withInstance(new Motion(0, 0, 0, 15)).add(MotionControls).withInstance(new MotionControls(KEY_LEFT, KEY_RIGHT, KEY_UP, 100, 3)).add(Gun).withInstance(new Gun(8, 0, 0.3, 2)).add(GunControls).withInstance(new GunControls(KEY_Z)).add(Collision).withInstance(new Collision(9)).add(Display).withInstance(new Display(new SpaceshipView(this.graphic)));

      deathView = new SpaceshipDeathView(this.graphic);
      fsm.createState("destroyed").add(DeathThroes).withInstance(new DeathThroes(5)).add(Display).withInstance(new Display(deathView)).add(Animation).withInstance(new Animation(deathView));

      spaceship.add(new Spaceship(fsm)).add(new Position(300, 225, 0)).add(new Audio());

      fsm.changeState("playing");
      this.engine.addEntity(spaceship);
      return spaceship;
    }

    /**
     * Create a Bullet
     * @param {asteroids.components.Gun}
     * @param {asteroids.components.Position}
     * @return {ash.core.Entity}
     */

    public createUserBullet(gun, parentPosition) {
      var bullet, cos, sin, x, y;
      cos = Math.cos(parentPosition.rotation);
      sin = Math.sin(parentPosition.rotation);

      x = cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x;
      y = sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y;

      bullet = new Entity().add(new Bullet(gun.bulletLifetime)).add(new Position(x, y, 0)).add(new Collision(0)).add(new Motion(cos * 150, sin * 150, 0, 0)).add(new Display(new BulletView(this.graphic)));
      this.engine.addEntity(bullet);
      return bullet;
    }
  }
}