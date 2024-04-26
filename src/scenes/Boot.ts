// import { fadeCameraToScene } from "@/utils/cameras";
import { TenebrisScene } from "@/classes/TenebrisScene";
import { Player } from "@/classes/Player";
import { CONSTANTS } from "@/constants";
import { PLAYER } from "@/constants/player";
import { SFX } from "@/types";
import { fadeCameraToScene } from "@/utils/cameras";

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
    this.load.tilemapTiledJSON("map", "map.json");
  }

  create() {
    super.create();
    // this.add.image(512, 384, CONSTANTS.IMAGES.BACKGROUND);
    this.spanFullScreen(CONSTANTS.IMAGES.CITY_ROOF_1, 0.1, -30);
    this.spanFullScreen(CONSTANTS.IMAGES.CITY_ROOF_2, 0.4);

    // this.add.image(0, 300, CONSTANTS.IMAGES.TILES);
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage(CONSTANTS.IMAGES.TILES);

    map.createLayer("Background", tileset!)?.setScale(2.2);
    map.createLayer("BackgroundDecor", tileset!)?.setScale(2.2);
    map.createLayer("BackgroundDecor2", tileset!)?.setScale(2.2);

    const platform = map
      .createLayer("Platform", tileset!)!
      .setScale(2.2)
      .setCollisionByExclusion([-1], true);

    this.bgm = this.sound.add(CONSTANTS.BGM.BGM_01, { loop: true, volume: 0 });
    this.bgm.play();

    this.player = new Player(this);
    this.player.bindCamera(this.cameras.main);
    this.player.collide(platform!);

    this.cameras.main.setBackgroundColor("#adbec7");
    this.spanFullScreen(CONSTANTS.IMAGES.CITY_ROOF_3, 1, 30);
  }

  init() {
    super.init();
  }

  restart() {
    this.player.stopMovement();
    fadeCameraToScene(CONSTANTS.SCENES.BOOT, this.cameras.main, 1000);
  }

  update() {
    this.volume = Math.min(this.volume + 0.1, 60);
    if (this.bgm.volume < 0.6) {
      this.bgm.setVolume(this.volume / 100);
    }
    super.update();
    this.player.update();
    this.moveImages();
    if (this.player.body.y > 1000) {
      this.player.body.y = 900;
      this.restart();
    }
  }
}
