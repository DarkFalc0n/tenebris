import { Scene } from "phaser";
import { getAudioPath, getImgPath, getSpritePath } from "@/utils";
import { AudioConfig, ISceneData, ImageConfig, SpriteConfig } from "@/types";

const defaultSceneData: ISceneData = {
  fadeTime: 1000,
  showFps: true,
};

export class TenebrisScene extends Scene {
  private fadeTime: number;
  protected fpsMonitor: Phaser.GameObjects.Text | null;

  protected loadImages(images: ImageConfig) {
    for (const [name, path] of Object.entries(images)) {
      this.load.image(name, getImgPath(path));
    }
  }

  protected loadSprites(sprites: SpriteConfig) {
    for (const [name, { path, frame }] of Object.entries(sprites)) {
      this.load.spritesheet(name, getSpritePath(path), frame);
    }
  }

  protected loadAudios(audios: AudioConfig) {
    for (const [name, { json, src }] of Object.entries(audios)) {
      this.load.audioSprite(name, getAudioPath(json)!, getAudioPath(src));
    }
  }

  init(data?: ISceneData) {
    const { fadeTime, showFps } = { ...defaultSceneData, ...data };
    this.fadeTime = fadeTime ?? 1000;

    // Create the fpsMonitor text object
    this.fpsMonitor = showFps
      ? this.add
          .text(10, 10, "FPS: 0", {
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#000",
          })
          .setScrollFactor(0)
          .setDepth(1000)
      : null;
  }

  create() {
    this.cameras.main.fadeIn(this.fadeTime, 0, 0, 0);
  }

  update() {
    // Check if the fpsMonitor exists, if it does, update the text
    if (this.fpsMonitor) {
      this.fpsMonitor.setText("FPS: " + Math.floor(this.game.loop.actualFps));
    }
  }
}
