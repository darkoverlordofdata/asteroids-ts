module asteroids.systems {

  import Animation = asteroids.components.Animation;
  import IAnimation = asteroids.components.IAnimation;
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
      var animation:IAnimation = this.am.get(e).animation;
      animation.animate(this.world.getDelta());

    }
  }
}

