module asteroids.systems {

  import Point = asteroids.ui.Point;
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

  import Aspect = artemis.Aspect;
  import Bag = artemis.utils.Bag;
  import ComponentMapper = artemis.ComponentMapper;
  import Entity = artemis.Entity;
  import EntitySystem = artemis.EntitySystem;
  import GroupManager = artemis.managers.GroupManager;
  import TagManager = artemis.managers.TagManager;
  import ImmutableBag = artemis.utils.ImmutableBag;
  import Mapper = artemis.annotations.Mapper;


  export class CollisionSystem extends EntitySystem {
    @Mapper(GameState) gm:ComponentMapper<GameState>;
    @Mapper(Position) pm:ComponentMapper<Position>;
    @Mapper(Collision) cm:ComponentMapper<Collision>;

    private collisionPairs:Bag<CollisionPair>;

    constructor() {
      super(Aspect.getAspectForAll(GameState));
    }


    public initialize() {

      this.collisionPairs = new Bag<CollisionPair>();

      this.collisionPairs.add(new CollisionPair(this, Constants.Groups.BULLETS, Constants.Groups.ASTEROIDS, {
          /**
           * Bullets collide with Asteroids
           * @param game
           * @param bullet
           * @param asteroid
           */
          handleCollision: (game:entity, bullet:Entity, asteroid:Entity) => {
            var c1:Collision = this.cm.get(asteroid);
            var p1:Point = this.pm.get(asteroid).position;
            if (c1.radius > 10) {
              var r1 = c1.radius - 10;
              var x1 = p1.x + Math.random() * 10 - 5;
              var y1 = p1.y + Math.random() * 10 - 5;
              this.world.createEntityFromTemplate('asteroid', r1, x1, y1).addToWorld();
              x1 = p1.x + Math.random() * 10 - 5;
              y1 = p1.y + Math.random() * 10 - 5;
              this.world.createEntityFromTemplate('asteroid', r1, x1, y1).addToWorld();
            }
            bullet.deleteFromWorld();
            asteroid.deleteFromWorld();
            this.gm.get(game).hits++;

            this.world.createEntityFromTemplate('asteroid_death', c1.radius, p1.x, p1.y).addToWorld();
          }
        }));

      this.collisionPairs.add(new CollisionPair(this, Constants.Groups.ASTEROIDS, Constants.Groups.SPACESHIP, {
          /**
           * Asteroids collide with Spaceships
           * @param game
           * @param asteroid
           * @param spaceship
           */
          handleCollision: (game:entity, asteroid:Entity, spaceship:Entity) => {
            var p:Point = this.pm.get(spaceship).position;
            spaceship.deleteFromWorld();
            this.gm.get(game).lives--;
            this.world.createEntityFromTemplate('spaceship_death', p.x, p.y).addToWorld();
          }
        }));
    }


    protected processEntities(entities:ImmutableBag<Entity>) {
      var e = entities.get(0);

      for (var i = 0; this.collisionPairs.size() > i; i++) {
        this.collisionPairs.get(i).checkForCollisions(e);
      }
    }

    protected checkProcessing():boolean {
      return true;
    }
  }

  interface CollisionHandler {
    handleCollision(e:Entity, a:Entity, b:Entity);
  }
  /**
   * Collision Pair
   */
  class CollisionPair {
    private groupEntitiesA:ImmutableBag<Entity>;
    private groupEntitiesB:ImmutableBag<Entity>;
    private handler:CollisionHandler;
    private parent:CollisionSystem;

    /**
     *
     * @param parent
     * @param group1
     * @param group2
     * @param handler
     */
    constructor(parent:CollisionSystem, group1:string, group2:string, handler:CollisionHandler) {
      this.parent = parent;
      this.groupEntitiesA = parent.world.getManager<GroupManager>(GroupManager).getEntities(group1);
      this.groupEntitiesB = parent.world.getManager<GroupManager>(GroupManager).getEntities(group2);
      this.handler = handler;
    }

    /**
     *
     * @param e
     */
    public checkForCollisions(e:Entity) {
      for (var a = 0; this.groupEntitiesA.size() > a; a++) {
        var entityA:Entity = this.groupEntitiesA.get(a);
        for (var b = 0; this.groupEntitiesB.size() > b; b++) {
          var entityB:Entity = this.groupEntitiesB.get(b);
          if (this.collisionExists(entityA, entityB)) {
            this.handler.handleCollision(e, entityA, entityB);
          }
        }
      }
    }

    /**
     *
     * @param e1
     * @param e2
     * @returns {boolean}
     */
    protected collisionExists(e1:Entity, e2:Entity):boolean {

      if (e1 === null || e2 === null) return false;

      var p1:Point = this.parent.pm.get(e1).position;
      var p2:Point = this.parent.pm.get(e2).position;

      var b1:Collision = this.parent.cm.get(e1);
      var b2:Collision = this.parent.cm.get(e2);

      var a = p1.x - p2.x;
      var b = p1.y - p2.y;
      return Math.sqrt(a * a + b * b) - b1.radius < b2.radius;
    }

  }
}

