module asteroids.templates {

  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;
  import EntitySystem = artemis.EntitySystem;
  import GroupManager = artemis.managers.GroupManager;

  import AsteroidDeathView = asteroids.graphics.AsteroidDeathView;
  import Asteroid = asteroids.components.Asteroid;
  import Display = asteroids.components.Display;
  import Animation = asteroids.components.Animation;
  import DeathThroes = asteroids.components.DeathThroes;
  import Position = asteroids.components.Position;
  import Audio = asteroids.components.Audio;
  import Constants = asteroids.Constants;

  @EntityTemplate('asteroid_death')
  export class AsteroidDeathTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, radius:number, x:number, y:number):artemis.Entity {

      var dying = new AsteroidDeathView(EntitySystem.blackBoard.getEntry('2d'), radius);

      entity.addComponent(Asteroid);
      entity.addComponent(Display, dying);
      entity.addComponent(Animation, dying);
      entity.addComponent(DeathThroes, 3);
      entity.addComponent(Position, x, y);
      entity.addComponent(Audio);
      //world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.ASTEROIDS);

      return entity;
    }
  }
}