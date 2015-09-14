module asteroids.templates {

  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;
  import EntitySystem = artemis.EntitySystem;
  import GroupManager = artemis.managers.GroupManager;

  import AsteroidView = asteroids.graphics.AsteroidView;
  import Constants = asteroids.Constants;
  import Asteroid = asteroids.components.Asteroid;
  import Display = asteroids.components.Display;
  import Position = asteroids.components.Position;
  import Motion = asteroids.components.Motion;
  import Collision = asteroids.components.Collision;
  import Audio = asteroids.components.Audio;

  @EntityTemplate('asteroid')
  export class AsteroidTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, radius:number, x:number, y:number):artemis.Entity {

      entity.addComponent(Asteroid);
      entity.addComponent(Display, new AsteroidView(<CanvasRenderingContext2D>EntitySystem.blackBoard.getEntry('2d'), radius));
      entity.addComponent(Position, x, y);
      entity.addComponent(Motion, (Math.random() - 0.5) * 4 * (50 - radius), (Math.random() - 0.5) * 4 * (50 - radius), Math.random() * 2 - 1, 0);
      entity.addComponent(Collision, radius);
      entity.addComponent(Audio);
      world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.ASTEROIDS);

      return entity;
    }
  }
}