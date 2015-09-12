module asteroids.systems {

  import Position = asteroids.components.Position;
  import Motion = asteroids.components.Motion;
  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;


  export class MovementSystem extends EntityProcessingSystem {
    /** @type {asteroids.GameConfig}*/

    public config = null;
    @Mapper(Position) pm:ComponentMapper<Position>;
    @Mapper(Motion) mm:ComponentMapper<Motion>;

    /**
     * @constructor
     */
    constructor(config) {
      super(Aspect.getAspectForAll(Position, Motion));
    }

    protected processEach(e:Entity) {
      //var motion, position, xDamp, yDamp;
      //position = node.position;
      //motion = node.motion;
      //position.position.x += motion.velocity.x * time;
      //position.position.y += motion.velocity.y * time;
      //
      //// check boundaries
      //if (position.position.x < 0) {
      //  position.position.x += this.config.width;
      //}
      //if (position.position.x > this.config.width) {
      //  position.position.x -= this.config.width;
      //}
      //if (position.position.y < 0) {
      //  position.position.y += this.config.height;
      //}
      //if (position.position.y > this.config.height) {
      //  position.position.y -= this.config.height;
      //}
      //position.rotation += motion.angularVelocity * time;
      //if (motion.damping > 0) {
      //  xDamp = Math.abs(Math.cos(position.rotation) * motion.damping * time);
      //  yDamp = Math.abs(Math.sin(position.rotation) * motion.damping * time);
      //  if (motion.velocity.x > xDamp) {
      //    motion.velocity.x -= xDamp;
      //  } else if (motion.velocity.x < -xDamp) {
      //    motion.velocity.x += xDamp;
      //  } else {
      //    motion.velocity.x = 0;
      //  }
      //  if (motion.velocity.y > yDamp) {
      //    motion.velocity.y -= yDamp;
      //  } else if (motion.velocity.y < -yDamp) {
      //    motion.velocity.y += yDamp;
      //  } else {
      //    motion.velocity.y = 0;  // Void
      //  }
      //}
    }
  }
}