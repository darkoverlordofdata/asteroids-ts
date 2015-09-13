module asteroids.templates {

  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;
  import EntitySystem = artemis.EntitySystem;
  import TagManager = artemis.managers.TagManager;
  import GroupManager = artemis.managers.GroupManager;

  import SpaceshipDeathView = asteroids.graphics.SpaceshipDeathView;

  import Spaceship = asteroids.components.Spaceship;
  import Display = asteroids.components.Display;
  import Animation = asteroids.components.Animation;
  import DeathThroes = asteroids.components.DeathThroes;
  import Position = asteroids.components.Position;
  import Audio = asteroids.components.Audio;
  import Constants = asteroids.Constants;

  @EntityTemplate('spaceship_death')
  export class SpaceshipDeathTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {

      var dying = new SpaceshipDeathView(EntitySystem.blackBoard.getEntry('2d'));
      var death = new DeathThroes();
      death.initialize(5, () => {
        world.getManager<TagManager>(TagManager).unregister(Constants.Tags.SPACESHIP);
      });

      //entity.addComponent(Spaceship);
      entity.addComponent(Display, dying);
      entity.addComponent(Animation, dying);
      entity.addComponent(death);
      entity.addComponent(Position, x, y);
      entity.addComponent(Audio);
      world.getManager<TagManager>(TagManager).register(Constants.Tags.SPACESHIP, entity);
      return entity;


    }

  }
}
