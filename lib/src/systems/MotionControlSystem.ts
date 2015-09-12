module asteroids.systems {

  import GameState = asteroids.components.GameState;
  import Hud = asteroids.components.Hud;
  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  import MotionControls = asteroids.components.MotionControls;
  import Position = asteroids.components.Position;
  import Motion = asteroids.components.Motion;
  import KeyPoll = asteroids.ui.KeyPoll;

  export class MotionControlSystem extends EntityProcessingSystem {


    @Mapper(MotionControls) cm:ComponentMapper<MotionControls>;
    @Mapper(Position) pm:ComponentMapper<Position>;
    @Mapper(Motion) mm:ComponentMapper<Motion>;

    /** @type {asteroids.input.KeyPoll}*/
    public keyPoll = null;


    constructor(keyPoll:KeyPoll) {
      super(Aspect.getAspectForAll(GameState, Hud));
    }

    protected processEach(e:Entity) {
      //var control, left, motion, position, right;
      //control = node.control;
      //position = node.position;
      //motion = node.motion;
      //
      //left = this.keyPoll.isDown(control.left);
      //right = this.keyPoll.isDown(control.right);
      //
      //if (left) {
      //  position.rotation -= control.rotationRate * time;
      //}
      //if (right) {
      //  position.rotation += control.rotationRate * time;
      //}
      //if (this.keyPoll.isDown(control.accelerate)) {
      //  motion.velocity.x += Math.cos(position.rotation) * control.accelerationRate * time;
      //  motion.velocity.y += Math.sin(position.rotation) * control.accelerationRate * time;  // Void
      //}

    }
  }
}