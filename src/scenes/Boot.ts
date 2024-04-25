// import { fadeCameraToScene } from "@/utils/cameras";
import { TenebrisScene } from "@/classes/TenebrisScene";
import { Player } from "@/classes/Player";
import { CONSTANTS } from "@/constants";
import { PLAYER } from "@/constants/player";
import { SFX } from "@/types";

export class Boot extends TenebrisScene {
  private player: Player;
  private bgm: SFX;
  private volume = 0;

  constructor() {
    super(CONSTANTS.SCENES.BOOT);
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
    this.spanFullScreen(CONSTANTS.IMAGES.CITY_ROOF_1, 0.1, -30);
    this.spanFullScreen(CONSTANTS.IMAGES.CITY_ROOF_2, 0.4);
    this.spanFullScreen(CONSTANTS.IMAGES.CITY_ROOF_3, 1, 30);

    this.bgm = this.sound.add(CONSTANTS.BGM.BGM_01, { loop: true, volume: 0 });
    this.bgm.play();

    this.player = new Player(this);
    this.player.bindCamera(this.cameras.main);

    // placeholder platform
    const platform = this.physics.add.staticGroup().setOrigin(0, 0);
    platform
      .create(
        0,
        this.player.body.y + this.player.body.height,
        PLAYER.SPRITE.BODY.name,
        0,
        false,
      )
      .refreshBody()
      .setSize(4000, 1);

    this.player.collide(platform);

    // this.input?.once("pointerdown", () => {
    //   fadeCameraToScene(CONSTANTS.SCENES.TEXT_SCENE, this.cameras.main, 1000, {
    //     text: "Hello World",
    //     timeOut: 3000,
    //     nextScene: "Game",
    //   });
    // });

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
    this.moveImages();
    if (Math.round(this.player.body.x) === 400) {
      this.player.stopMovement();
      this.showSubtitle(
        "A torn city, a broken heart, a lost soul.",
        () => {
          this.showSubtitle("Press SPACE to jump", () => {
            this.player.startMovement();
          });
        },
        3000,
      );
    }
  }
}
