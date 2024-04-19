import { fadeCameraToScene } from "../utils/cameras.utils";
import { TenebrisScene } from "../classes/tenebrisScene";
import { Player } from "../classes/player";

export class Boot extends TenebrisScene {
  player: Player;
  fpsMonitor: Phaser.GameObjects.Text;

  constructor() {
    super("Boot");
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("background", "bg.png");
    this.load.spritesheet("player", "sprites/player.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create() {
    this.physics.world.gravity.y = 500;
    this.add.image(512, 384, "background");

    this.player = new Player(this);
    this.player.loadAnimations(2);
    this.player.loadActions();

    const platform = this.physics.add.staticGroup();
    platform
      .create(
        0,
        this.player.y + this.player.height,
        "player",
        4,
      )
      .refreshBody()
      .setSize(2000, 1);

    this.physics.add.collider(this.player, platform);

    this.input?.once("pointerdown", () => {
      fadeCameraToScene(
        "TextScene",
        this.cameras.main,
        1000,
        {
          text: "Hello World",
          timeOut: 3000,
          nextScene: "Game",
        },
      );
    });

    this.fpsMonitor = this.add.text(10, 10, "FPS: 0", {
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#000",
    }).setScrollFactor(0);
  }

  update() {
    this.fpsMonitor.setText("FPS: " + Math.floor(this.game.loop.actualFps));
    this.player.registerActions();
    this.player.playAnimations();
  }
}
