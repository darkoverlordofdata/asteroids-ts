module asteroids.systems {

  import Bullet = asteroids.components.Bullet;
  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  export class BulletAgeSystem extends EntityProcessingSystem {
    @Mapper(Bullet) bm:ComponentMapper<Bullet>;

    /**
     * @constructor
     */
    constructor() {
      super(Aspect.getAspectForAll(Bullet));
    }

    protected processEach(e:Entity) {
      var time = this.world.getDelta();
      var bullet:Bullet = this.bm.get(e);

      bullet.lifeRemaining -= time;
      if (bullet.lifeRemaining <= 0) {
        this.world.deleteEntity(e);
      }
    }
  }

}