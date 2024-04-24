import { fadeCameraToScene } from "@/utils/cameras";
import { TenebrisScene } from "@/classes/TenebrisScene";
import { Player } from "@/classes/Player";
import { CONSTANTS } from "@/constants";
import { PLAYER } from "@/constants/player";
import { SFX } from "@/types";

export class Boot extends TenebrisScene {
  private player: Player;
  private volume: number;
  private bgm: SFX;

  constructor() {
    super(CONSTANTS.SCENES.BOOT);
    this.volume = 0;
  }

  preload() {
    this.load.setPath(CONSTANTS.ASSET_DIR);

    this.loadImages(CONSTANTS.IMAGES);
    this.loadAudio(CONSTANTS.BGM);
    this.loadSprites(PLAYER.SPRITE);
    this.loadAudioSprites(PLAYER.AUDIO);
  }

  create() {
    // this.add.image(512, 384, CONSTANTS.IMAGES.BACKGROUND);
    this.bgm = this.sound.add(CONSTANTS.BGM.BGM_01, { loop: true, volume: 0 });
    this.bgm.play();

    this.player = new Player(this);

    // placeholder platform
    const platform = this.physics.add.staticGroup();
    platform
      .create(
        0,
        this.player.y + this.player.height,
        PLAYER.SPRITE.BODY.name,
        0,
        false,
      )
      .refreshBody()
      .setSize(2000, 1);

    this.player.collide(platform);

    this.input?.once("pointerdown", () => {
      fadeCameraToScene(CONSTANTS.SCENES.TEXT_SCENE, this.cameras.main, 1000, {
        text: "Hello World",
        timeOut: 3000,
        nextScene: "Game",
      });
    });

    this.cameras.main.setBackgroundColor("#adbec7");
  }

  init() {
    super.init();
  }

  update() {
    this.volume = Math.min(this.volume + 0.1, 60);
    if (this.bgm.volume < 0.6) {
      this.bgm.setVolume(this.volume / 100);
    }
    super.update();
    this.player.update();
  }
}
