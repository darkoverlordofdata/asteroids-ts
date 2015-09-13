module asteroids.templates {

  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;
  import EntitySystem = artemis.EntitySystem;
  import TagManager = artemis.managers.TagManager;
  import GroupManager = artemis.managers.GroupManager;

  import SpaceshipView = asteroids.graphics.SpaceshipView;

  import Spaceship = asteroids.components.Spaceship;
  import Constants = asteroids.Constants;
  import Display = asteroids.components.Display;
  import Position = asteroids.components.Position;
  import Motion = asteroids.components.Motion;
  import MotionControls = asteroids.components.MotionControls;
  import Collision = asteroids.components.Collision;
  import Gun = asteroids.components.Gun;
  import GunControls = asteroids.components.GunControls;
  import Audio = asteroids.components.Audio;

  const KEY_LEFT = 37;
  const KEY_UP = 38;
  const KEY_RIGHT = 39;
  const KEY_Z = 90;

  @EntityTemplate('spaceship')
  export class SpaceshipTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World):artemis.Entity {

      entity.addComponent(Spaceship);
      entity.addComponent(Display, new SpaceshipView(EntitySystem.blackBoard.getEntry('2d')));
      entity.addComponent(Position, 300, 225, 0);
      entity.addComponent(Motion, 0, 0, 0, 15);
      entity.addComponent(MotionControls, KEY_LEFT, KEY_RIGHT, KEY_UP, 100, 3);
      entity.addComponent(Gun, 8, 0, 0.3, 2);
      entity.addComponent(GunControls, KEY_Z);
      entity.addComponent(Collision, 9);
      entity.addComponent(Audio);
      world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.SPACESHIP);

      return entity;
    }

  }
}
