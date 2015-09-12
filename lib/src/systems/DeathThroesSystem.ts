module asteroids.systems {

  import DeathThroes = asteroids.components.DeathThroes;
  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  export class DeathThroesSystem extends EntityProcessingSystem {

    @Mapper(DeathThroes) am:ComponentMapper<DeathThroes>;


    /**
     * @constructor
     */
    constructor() {
      super(Aspect.getAspectForAll(DeathThroes));
    }

    protected processEach(e:Entity) {
      //var c:DeathThroes = this.am.get(e);
      //
      //c.duration -= this.world.delta;
      //if (c.duration <= 0) {
      //  this.creator.destroyEntity(node.entity);  // Void
      //}
    }
  }
}