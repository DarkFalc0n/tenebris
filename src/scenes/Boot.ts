import { fadeCameraToScene } from "@/utils/cameras";
import { TenebrisScene } from "@/classes/TenebrisScene";
import { Player } from "@/classes/Player";
import { CONSTANTS } from "@/constants";
import { PLAYER } from "@/constants/player";

export class Boot extends TenebrisScene {
  player: Player;

  constructor() {
    super(CONSTANTS.SCENES.BOOT);
  }

  preload() {
    this.load.setPath(CONSTANTS.ASSET_DIR);
    this.loadImages(CONSTANTS.IMAGES);
    this.loadSprites(CONSTANTS.SPRITES);
    this.loadAudios(CONSTANTS.AUDIOS);
  }

  create() {
    this.add.image(512, 384, "BACKGROUND");

    this.player = new Player(this);

    // placeholder platform
    const platform = this.physics.add.staticGroup();
    platform
      .create(0, this.player.y + this.player.height, PLAYER.NAME, 0, false)
      .refreshBody()
      .setSize(2000, 1);

    this.physics.add.collider(this.player, platform);

    this.input?.once("pointerdown", () => {
      fadeCameraToScene(CONSTANTS.SCENES.TEXT_SCENE, this.cameras.main, 1000, {
        text: "Hello World",
        timeOut: 3000,
        nextScene: "Game",
      });
    });
  }

  init() {
    super.init();
  }

  update() {
    super.update();
    this.player.update();
  }
}
