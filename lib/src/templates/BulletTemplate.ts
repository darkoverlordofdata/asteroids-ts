module asteroids.templates {

  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;
  import EntitySystem = artemis.EntitySystem;
  import GroupManager = artemis.managers.GroupManager;

  import BulletView = asteroids.graphics.BulletView;
  import Constants = asteroids.Constants;
  import Bullet = asteroids.components.Asteroid;
  import Display = asteroids.components.Display;
  import Position = asteroids.components.Position;
  import Motion = asteroids.components.Motion;
  import Collision = asteroids.components.Collision;

  @EntityTemplate('bullet')
  export class BulletTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, gun, parentPosition):artemis.Entity {

      var cos = Math.cos(parentPosition.rotation);
      var sin = Math.sin(parentPosition.rotation);

      var x = cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x;
      var y = sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y;

      entity.addComponent(Bullet, gun.bulletLifetime);
      entity.addComponent(Display, new BulletView(EntitySystem.blackBoard.getEntry('2d')));
      entity.addComponent(Position, x, y, 0);
      entity.addComponent(Motion, cos * 150, sin * 150, 0, 0);
      entity.addComponent(Collision, 0);
      world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.BULLETS);
      return entity;
    }
  }
}
