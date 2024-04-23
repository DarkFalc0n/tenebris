import { Scene } from "phaser";
import { getAudioPath, getImagePath } from "@/utils";
import { ISceneData, TAudioSpriteFile, TSpriteFile } from "@/types";

const defaultSceneData: ISceneData = {
  fadeTime: 1000,
  showFps: true,
};

export class TenebrisScene extends Scene {
  private fadeTime: number;
  protected fpsMonitor: Phaser.GameObjects.Text | null;

  protected loadImages(images: Record<string, string>) {
    for (const name of Object.values(images)) {
      this.load.image(name, getImagePath(name));
    }
  }

  protected loadSprites(sprites: Record<string, TSpriteFile>) {
    for (const { name, path, frame } of Object.values(sprites)) {
      this.load.spritesheet(name, getImagePath(path), frame);
    }
  }

  protected loadAudio(audio: Record<string, string>) {
    for (const name of Object.values(audio)) {
      this.load.audio(name, getAudioPath(name));
    }
  }

  protected loadAudioSprites(...audioSprites: TAudioSpriteFile[]) {
    for (const { name, json, src } of audioSprites) {
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
