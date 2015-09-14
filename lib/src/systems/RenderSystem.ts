module asteroids.systems {

  import Position = asteroids.components.Position;
  import Display = asteroids.components.Display;
  import Mapper = artemis.annotations.Mapper;
  import ImmutableBag = artemis.utils.ImmutableBag;
  import GameConfig = asteroids.GameConfig;

  import EntitySystem = artemis.EntitySystem;
  import ComponentMapper = artemis.ComponentMapper;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  const DOUBLE_BUFFERING = (location.search === '?b=2');

  console.log('Using DOUBLE_BUFFERING', DOUBLE_BUFFERING);

  export class RenderSystem extends EntitySystem {
    @Mapper(Position) pm:ComponentMapper<Position>;
    @Mapper(Display) dm:ComponentMapper<Display>;

    private graphic:CanvasRenderingContext2D;
    private screen:CanvasRenderingContext2D;
    private canvas:HTMLCanvasElement;
    private config:GameConfig;

    /**
     * @constructor
     */
    constructor(graphic:CanvasRenderingContext2D, config:GameConfig) {
      super(Aspect.getAspectForAll(Position, Display));
      this.config = config;
      this.graphic = graphic;

      /**
       * DOUBLE_BUFFERING?
       * create an off screen canvas
       */
      if (DOUBLE_BUFFERING) {
        this.screen = graphic;
        this.canvas = document.createElement("canvas");
        this.graphic =  this.canvas.getContext('2d');
        this.canvas.width = config.width;
        this.canvas.height = config.height;
      }
    }

    public processEntities(entities:ImmutableBag<Entity>) {

      this.graphic.clearRect(0, 0, this.config.width, this.config.height);
      for (var i=0, k=entities.size(); i<k; i++) {
        this.processEach(entities.get(i));
      }

      /**
       * DOUBLE_BUFFERING?
       * copy to the off screen canvas
       */
      if (DOUBLE_BUFFERING) {
        this.screen.clearRect(0, 0, this.config.width, this.config.height);
        this.screen.drawImage(this.canvas, 0, 0);
      }
    }

    public processEach(e:Entity) {

      var position =  this.pm.get(e);
      var display = this.dm.get(e);
      var sprite = display.sprite;
      sprite.x = position.position.x;
      sprite.y = position.position.y;
      sprite.rotation = position.rotation;
      sprite.draw(this.graphic);

    }
  }
}