module asteroids.systems {

  import Animation = asteroids.components.Animation;
  import Mapper = artemis.annotations.Mapper;

  import EntitySystem = artemis.EntitySystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;
  import Point = asteroids.ui.Point;

  import GameState = asteroids.components.GameState;
  import Position = asteroids.components.Position;
  import Spaceship = asteroids.components.Spaceship;
  import Asteroid = asteroids.components.Asteroid;
  import Bullet = asteroids.components.Bullet;

  export class GameManager extends EntitySystem {

    @Mapper(GameState) gm:ComponentMapper<GameState>;
    @Mapper(Position) pm:ComponentMapper<Position>;
    @Mapper(Spaceship) sm:ComponentMapper<Spaceship>;
    @Mapper(Asteroid) am:ComponentMapper<Asteroid>;
    @Mapper(Bullet) bm:ComponentMapper<Bullet>;

    /** @type {asteroids.GameConfig}*/
    public config = null;

    /**
     * @constructor
     */
    constructor(config) {
      super(Aspect.getAspectForAll(GameState, Position, Spaceship, Asteroid, Bullet));
      this.config = config;
    }

    protected processEach(e:Entity) {
    //  var asteroid, asteroidCount, clearToAddSpaceship, i, newSpaceshipPosition, node, position, spaceship;
    //  node = this.gameNodes.head;
    //  if (node && node.state.playing) {
    //    if (this.spaceships.isEmpty()) {
    //      if (node.state.lives > 0) {
    //        newSpaceshipPosition = new Point(this.config.width * 0.5, this.config.height * 0.5);
    //        clearToAddSpaceship = true;
    //        asteroid = this.asteroids.head;
    //        while (asteroid) {
    //          if (Point.distance(asteroid.position.position, newSpaceshipPosition) <= asteroid.collision.radius + 50) {
    //            clearToAddSpaceship = false;
    //            break;
    //          }
    //          asteroid = asteroid.next;
    //        }
    //        if (clearToAddSpaceship) {
    //          this.creator.createSpaceship();
    //        }
    //      } else {
    //        node.state.playing = false;
    //        this.creator.createWaitForClick();
    //      }
    //    }
    //
    //    // game over
    //    if (this.asteroids.isEmpty() && this.bullets.isEmpty() && !this.spaceships.isEmpty()) {
    //      // next level
    //      spaceship = this.spaceships.head;
    //      node.state.level++;
    //      asteroidCount = 2 + node.state.level;
    //      i = 0;
    //
    //      while (i < asteroidCount) {
    //        // check not on top of spaceship
    //        while (true) {
    //          position = new Point(Math.random() * this.config.width, Math.random() * this.config.height);
    //          if (!(Point.distance(position, spaceship.position.position) <= 80)) {
    //            break;
    //          }
    //        }
    //
    //        this.creator.createAsteroid(30, position.x, position.y);
    //        ++i;  // Void
    //      }
    //    }
    //  }
    }

  }
}