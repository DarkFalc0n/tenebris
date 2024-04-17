import { fadeCameraToScene } from "../utils/cameras.utils";
import { TenebrisScene } from "../classes/tenebrisScene";
import { Player } from "../classes/player";
import { Input } from "phaser";

export class Boot extends TenebrisScene {
  player: Player;

  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
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

    const platform = this.physics.add.staticGroup();
    platform
      .create(
        0,
        this.player.y + this.player.height,
        "player",
        0,
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
  }

  update() {
    const forwardKey = this.input.keyboard?.addKey(
      Input.Keyboard.KeyCodes.D,
    );
    const backwardKey = this.input.keyboard?.addKey(
      Input.Keyboard.KeyCodes.A,
    );
    const jumpKey = this.input.keyboard?.addKey(
      Input.Keyboard.KeyCodes.SPACE,
    )!;

    if (
      Input.Keyboard.JustDown(jumpKey) &&
      this.player?.body?.touching.down
    ) {
      this.player.jump();
    } else if (forwardKey?.isDown) {
      this.player.walk();
    } else if (backwardKey?.isDown) {
      this.player.walk(-1);
    } else if (forwardKey?.isUp || backwardKey?.isUp) {
      this.player.idle();
      this.player.setVelocityX(0);
    }
  }
}
