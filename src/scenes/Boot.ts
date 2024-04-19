import { fadeCameraToScene } from "@/utils/cameras";
import { TenebrisScene } from "@/classes/TenebrisScene";
import { Player } from "@/classes/Player";
import { CONSTANTS } from "@/constants";
import { loadImages, loadSprites } from "@/utils/loader";
import { PLAYER } from "@/constants/player";

export class Boot extends TenebrisScene {
  player: Player;

  constructor() {
    super(CONSTANTS.SCENES.BOOT);
  }

  preload() {
    this.load.setPath(CONSTANTS.ASSET_DIR);

    loadImages(this);
    loadSprites(this);
  }

  create() {
    this.physics.world.gravity.y = CONSTANTS.CONFIG.GRAVITY;
    this.add.image(512, 384, "BACKGROUND");

    this.player = new Player(this);
    this.player.loadAnimations();
    this.player.loadActions();

    // placeholder platform
    const platform = this.physics.add.staticGroup();
    platform
      .create(
        0,
        this.player.y + this.player.height,
        PLAYER.NAME,
        4,
      )
      .refreshBody()
      .setSize(2000, 1);

    this.physics.add.collider(this.player, platform);

    this.input?.once("pointerdown", () => {
      fadeCameraToScene(
        CONSTANTS.SCENES.TEXT_SCENE,
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

  init() {
    super.init({}) // Call the parent class's init method
  }

  update() {
    super.update() // Call the parent class's update method
    this.player.registerActions();
    this.player.playAnimations();
  }
}
