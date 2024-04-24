import { GameObjects, Scene } from "phaser";
import { getAudioPath, getImagePath } from "@/utils";
import { ISceneData, TAudioSpriteFile, TSpriteFile } from "@/types";

const defaultSceneData: ISceneData = {
  fadeTime: 1000,
  showFps: true,
};

export class TenebrisScene extends Scene {
  private images: GameObjects.Image[][];
  private imageIndex: number[];
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

  protected spanFullScreen(name: string, scrollFactor = 1, y = 0, x = 0) {
    const curr = this.add
      .image(x, y, name)
      .setOrigin(0, 0)
      .setScrollFactor(scrollFactor);
    const prev = this.add
      .image(x - (this.sys.game.config.width as number), y, name)
      .setOrigin(0, 0)
      .setScrollFactor(scrollFactor);
    const next = this.add
      .image(x + (this.sys.game.config.width as number), y, name)
      .setOrigin(0, 0)
      .setScrollFactor(scrollFactor);

    this.imageIndex.push(1);
    this.images.push([prev, curr, next]);
  }

  protected moveImages() {
    const width = this.sys.game.config.width as number;
    const left = this.cameras.main.scrollX + 62;
    const right = left + width;

    this.images.forEach((pos, idx) => {
      const curr = this.imageIndex[idx];

      if (left < pos[curr].x - width / 2) {
        // next.x = prev.x - width;
        pos[(curr + 1) % 3].x = pos[(curr + 2) % 3].x - width;
        this.imageIndex[idx] = (curr + 2) % 3; // idx = idx - 1
      }
      if (right > pos[curr].x + width * 1.5) {
        // prev.x = next.x + 2 * width;
        pos[(curr + 2) % 3].x = pos[(curr + 1) % 3].x + 1 * width;
        this.imageIndex[idx] = (curr + 1) % 3; // idx = idx + 1
      }
    });
  }

  init(data?: ISceneData) {
    const { fadeTime, showFps } = { ...defaultSceneData, ...data };
    this.fadeTime = fadeTime ?? 1000;
    this.images = [];
    this.imageIndex = [];

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
