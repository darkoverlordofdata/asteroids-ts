module asteroids.systems {

  import Audio = asteroids.components.Audio;
  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  export class AudioSystem extends EntityProcessingSystem {
    @Mapper(Audio) am:ComponentMapper<Audio>;


    /**
     * @constructor
     */
    constructor() {
      super(Aspect.getAspectForAll(Audio));
    }

    protected processEach(e:Entity) {
      var c:Audio = this.am.get(e);

      for (var i in c.toPlay) {
        var Type:any = c.toPlay[i];
        var sound = new Type();
        sound.play(0, 1);
      }
      c.toPlay.length = 0
    }
  }
}