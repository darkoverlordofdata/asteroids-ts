module asteroids.systems {

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

  import EntitySystem = artemis.EntitySystem;
  import Mapper = artemis.annotations.Mapper;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import ImmutableBag = artemis.utils.ImmutableBag;
  import Entity = artemis.Entity;

  export class CollisionSystem extends EntitySystem {

    @Mapper(Position) pm:ComponentMapper<Position>;

    /** @type {asteroids.EntityCreator}*/
    public creator = null;

    constructor() {
      super(Aspect.getAspectForAll(Position));
    }


    protected processEntities(entities:ImmutableBag<Entity>) {
      for (var i = 0; entities.size() > i; i++) {
        this.processEach(entities[i]);
      }
    }

    public processEach(entity) {
      //    var asteroid, bullet, spaceship;
      //    bullet = this.bullets.head;
      //    while (bullet) {
      //        asteroid = this.asteroids.head;
      //        while (asteroid) {
      //            if (asteroid.position.position.distanceTo(bullet.position.position) <= asteroid.collision.radius) {
      //                /*
      //                 You hit an asteroid
      //                 */
      //                this.creator.destroyEntity(bullet.entity);
      //                if (asteroid.collision.radius > 10) {
      //                    this.creator.createAsteroid(asteroid.collision.radius - 10, asteroid.position.position.x + Math.random() * 10 - 5, asteroid.position.position.y + Math.random() * 10 - 5);
      //                    this.creator.createAsteroid(asteroid.collision.radius - 10, asteroid.position.position.x + Math.random() * 10 - 5, asteroid.position.position.y + Math.random() * 10 - 5);
      //                }
      //                asteroid.asteroid.fsm.changeState("destroyed");
      //                //asteroid.audio.play(ExplodeAsteroid)
      //                if (this.games.head) {
      //                    this.games.head.state.hits++;
      //                }
      //                break;
      //            }
      //
      //            asteroid = asteroid.next;
      //        }
      //        bullet = bullet.next;
      //    }
      //
      //    spaceship = this.spaceships.head;
      //    while (spaceship) {
      //        asteroid = this.asteroids.head;
      //        while (asteroid) {
      //            if (asteroid.position.position.distanceTo(spaceship.position.position) <= asteroid.collision.radius + spaceship.collision.radius) {
      //                /*
      //                 You were hit
      //                 */
      //                spaceship.spaceship.fsm.changeState("destroyed");
      //                //asteroid.audio.play(ExplodeShip)
      //                if (this.games.head) {
      //                    this.games.head.state.lives++;
      //                }
      //                break;
      //            }
      //
      //            asteroid = asteroid.next;
      //        }
      //        spaceship = spaceship.next;  // Void
      //    }
      //
    }
  }
}