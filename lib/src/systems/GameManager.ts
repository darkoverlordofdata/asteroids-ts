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

    private state:GameState;
    /**
     * @constructor
     */
    constructor(config:GameConfig) {
      //super(Aspect.getAspectForAll(GameState, Position, Spaceship, Asteroid, Bullet));
      super(Aspect.getAspectForAll(GameState));
      this.config = config;
    }

    public processEntities(entities:ImmutableBag<Entity>) {
      for (var i=0, k=entities.size(); i<k; i++) {
        this.processEach(entities.get(i));
      }
    }

    protected processEach(e:Entity) {
      var game:GameState = this.gm.get(e);
      if (game.playing) {
        var ships = this.world.getManager<GroupManager>(GroupManager).getEntities(Constants.Groups.SPACESHIP);
        if (ships.isEmpty()) {
        //if (!this.world.getManager<TagManager>(TagManager).isRegistered(Constants.Tags.SPACESHIP)) {
          if (game.lives > 0) {

            var newSpaceshipPosition = new Point(this.config.width * 0.5, this.config.height * 0.5);
            var clearToAddSpaceship = true;
            var asteroids = this.world.getManager<GroupManager>(GroupManager).getEntities(Constants.Groups.ASTEROIDS);

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
        }
        var asteroids = this.world.getManager<GroupManager>(GroupManager).getEntities(Constants.Groups.ASTEROIDS);
        var bullets = this.world.getManager<GroupManager>(GroupManager).getEntities(Constants.Groups.BULLETS);

        var ships = this.world.getManager<GroupManager>(GroupManager).getEntities(Constants.Groups.SPACESHIP);
        if (!ships.isEmpty()) {
        //if (this.world.getManager<TagManager>(TagManager).isRegistered(Constants.Tags.SPACESHIP)) {

          //var ship:Entity = this.world.getManager<TagManager>(TagManager).getEntity(Constants.Tags.SPACESHIP);
          var ship = ships.get(0);
          var shipPos:Position = <Position>ship.getComponentByType(Position);
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