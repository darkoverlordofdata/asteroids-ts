module asteroids.systems {

  import DeathThroes = asteroids.components.DeathThroes;
  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  export class DeathThroesSystem extends EntityProcessingSystem {

    @Mapper(DeathThroes) dm:ComponentMapper<DeathThroes>;


    /**
     * @constructor
     */
    constructor() {
      super(Aspect.getAspectForAll(DeathThroes));
    }

    protected processEach(e:Entity) {
      var time = this.world.getDelta();
      var death:DeathThroes = this.dm.get(e);

      death.duration -= time;
      if (death.duration <= 0) {
        this.world.deleteEntity(e);
      }
    }
  }
}