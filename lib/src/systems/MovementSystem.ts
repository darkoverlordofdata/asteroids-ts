module asteroids.systems {

  import Position = asteroids.components.Position;
  import Motion = asteroids.components.Motion;
  import GameConfig = asteroids.GameConfig;

  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;


  export class MovementSystem extends EntityProcessingSystem {
    /** @type {asteroids.GameConfig}*/

    public config:GameConfig = null;
    @Mapper(Position) pm:ComponentMapper<Position>;
    @Mapper(Motion) mm:ComponentMapper<Motion>;

    /**
     * @constructor
     */
    constructor(config) {
      super(Aspect.getAspectForAll(Position, Motion));
      this.config = config;
    }

    protected processEach(e:Entity) {

      var time = this.world.getDelta();
      var position:Position = this.pm.get(e);
      var motion:Motion = this.mm.get(e);

      position.position.x += motion.velocity.x * time;
      position.position.y += motion.velocity.y * time;

      // check boundaries
      if (position.position.x < 0) {
        position.position.x += this.config.width;
      }
      if (position.position.x > this.config.width) {
        position.position.x -= this.config.width;
      }
      if (position.position.y < 0) {
        position.position.y += this.config.height;
      }
      if (position.position.y > this.config.height) {
        position.position.y -= this.config.height;
      }
      position.rotation += motion.angularVelocity * time;
      if (motion.damping > 0) {
        var xDamp = Math.abs(Math.cos(position.rotation) * motion.damping * time);
        var yDamp = Math.abs(Math.sin(position.rotation) * motion.damping * time);
        if (motion.velocity.x > xDamp) {
          motion.velocity.x -= xDamp;
        } else if (motion.velocity.x < -xDamp) {
          motion.velocity.x += xDamp;
        } else {
          motion.velocity.x = 0;
        }
        if (motion.velocity.y > yDamp) {
          motion.velocity.y -= yDamp;
        } else if (motion.velocity.y < -yDamp) {
          motion.velocity.y += yDamp;
        } else {
          motion.velocity.y = 0;  // Void
        }
      }
    }
  }
}