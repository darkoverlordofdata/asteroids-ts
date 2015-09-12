module asteroids.systems {

  import Animation = asteroids.components.Animation;
  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  export class AnimationSystem extends EntityProcessingSystem {
    @Mapper(Animation) am:ComponentMapper<Animation>;

    /**
     * @constructor
     */
    constructor() {
        super(Aspect.getAspectForAll(Animation));
    }

    protected processEach(e:Entity) {
      var c:Animation = this.am.get(e);
      //c.animation.animate(this.world.delta);

    }
  }
}

