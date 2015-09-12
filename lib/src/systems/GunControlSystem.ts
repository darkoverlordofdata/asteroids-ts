module asteroids.systems {

  import Animation = asteroids.components.Animation;
  import Mapper = artemis.annotations.Mapper;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  import Audio = asteroids.components.Audio;
  import GunControls = asteroids.components.GunControls;
  import Gun = asteroids.components.Gun;
  import Position = asteroids.components.Position;
  import KeyPoll = asteroids.ui.KeyPoll;

  export class GunControlSystem extends EntityProcessingSystem {

    @Mapper(Audio) am:ComponentMapper<Audio>;
    @Mapper(GunControls) cm:ComponentMapper<GunControls>;
    @Mapper(Gun) gm:ComponentMapper<Gun>;
    @Mapper(Position) pm:ComponentMapper<Position>;

    /** @type {asteroids.input.KeyPoll}*/
    public keyPoll = null;

    /**
     * @constructor
     */
    constructor(keyPoll:KeyPoll) {
      super(Aspect.getAspectForAll(Animation));
      this.keyPoll = keyPoll;
    }

    protected processEach(e:Entity) {

      //var control, gun, position;
      //control = node.control;
      //position = node.position;
      //gun = node.gun;
      //gun.shooting = this.keyPoll.isDown(control.trigger);
      //gun.timeSinceLastShot += time;
      //if (gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval) {
      //  this.creator.createUserBullet(gun, position);
      //  gun.timeSinceLastShot = 0;  // Void
      //}
    }
  }
}