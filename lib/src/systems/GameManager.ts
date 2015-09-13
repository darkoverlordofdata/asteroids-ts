module asteroids.systems {

  import Animation = asteroids.components.Animation;
  import Mapper = artemis.annotations.Mapper;
  import ImmutableBag = artemis.utils.ImmutableBag;
  import GroupManager = artemis.managers.GroupManager;
  import TagManager = artemis.managers.TagManager;


  import EntitySystem = artemis.EntitySystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;
  import Point = asteroids.ui.Point;

  import GameState = asteroids.components.GameState;
  import Position = asteroids.components.Position;
  import Collision = asteroids.components.Collision;
  import Spaceship = asteroids.components.Spaceship;
  import Asteroid = asteroids.components.Asteroid;
  import Bullet = asteroids.components.Bullet;
  import Constants = asteroids.Constants;

  export class GameManager extends EntitySystem {

    @Mapper(GameState) gm:ComponentMapper<GameState>;
    //@Mapper(Position) pm:ComponentMapper<Position>;
    //@Mapper(Spaceship) sm:ComponentMapper<Spaceship>;
    //@Mapper(Asteroid) am:ComponentMapper<Asteroid>;
    //@Mapper(Bullet) bm:ComponentMapper<Bullet>;

    /** @type {asteroids.GameConfig}*/
    public config:GameConfig = null;

    /** @type {artemis.managers.TagManager} */
    private tags:TagManager;

    /** *@type {artemis.managers.GroupManager} */
    private groups:GroupManager;

    private state:GameState;
    /**
     * @constructor
     */
    constructor(config:GameConfig) {
      //super(Aspect.getAspectForAll(GameState, Position, Spaceship, Asteroid, Bullet));
      super(Aspect.getAspectForAll(GameState));
      this.config = config;
    }

    public initialize() {
      this.tags = this.world.getManager<TagManager>(TagManager);
      this.groups = this.world.getManager<GroupManager>(GroupManager);
    }

    public processEntities(entities:ImmutableBag<Entity>) {
      for (var i=0, k=entities.size(); i<k; i++) {
        this.processEach(entities.get(i));
      }
    }

    protected processEach(e:Entity) {
      if (this.tags.isRegistered(Constants.Tags.SPACESHIP)) {
        return;
      }
      var game:GameState = this.gm.get(e);
      if (game.playing) {
        var ships = this.groups.getEntities(Constants.Groups.SPACESHIP);
        if (ships.isEmpty()) {
          if (game.lives > 0) {

            var newSpaceshipPosition = new Point(this.config.width * 0.5, this.config.height * 0.5);
            var clearToAddSpaceship = true;
            var asteroids = this.groups.getEntities(Constants.Groups.ASTEROIDS);

            for (var i=0, k=asteroids.size(); i<k; i++) {
              var asteroid:Entity = asteroids.get(i);
              var position:Position = <Position>asteroid.getComponentByType(Position);
              var collision:Collision = <Collision>asteroid.getComponentByType(Collision);
              if (Point.distance(position.position, newSpaceshipPosition) <= collision.radius + 50) {
                clearToAddSpaceship = false;
                break;
              }

            }
            if (clearToAddSpaceship) {
              this.world.createEntityFromTemplate('spaceship').addToWorld();
            }
          }
        } else {
          var ship = ships.get(0);
          var shipPos:Position = <Position>ship.getComponentByType(Position);
          var asteroids = this.groups.getEntities(Constants.Groups.ASTEROIDS);
          var bullets = this.groups.getEntities(Constants.Groups.BULLETS);
          // Level Over?
          if (asteroids.isEmpty() && bullets.isEmpty()) {
            game.level++;
            var asteroidCount = 2 + game.level;
            for (i = 0; i < asteroidCount; i++) {
              while (true) {
                var p:Point = new Point(Math.random() * this.config.width, Math.random() * this.config.height);
                if (!(Point.distance(p, shipPos.position) <= 80)) {
                  break;
                }
              }
              this.world.createEntityFromTemplate('asteroid', 30, p.x, p.y).addToWorld();
            }
          }
        }
      }
    }
  }
}