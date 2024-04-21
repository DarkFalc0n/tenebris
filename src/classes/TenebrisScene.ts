import { Scene } from "phaser";
import { getImgPath, getSpritePath } from "@/utils";

const defaultSceneData = {
  fadeTime: 1000,
  showFps: true,
};

export class TenebrisScene extends Scene {
  private fadeTime: number;
  protected fpsMonitor: Phaser.GameObjects.Text | null;

  protected loadImages(images: object) {
    for (const [name, path] of Object.entries(images)) {
      this.load.image(name, getImgPath(path));
    }
  }

  protected loadSprites(sprites: object) {
    for (const [name, sprite] of Object.entries(sprites)) {
      this.load.spritesheet(name, getSpritePath(sprite.PATH), sprite.FRAME);
    }
  }

  init(data?: typeof defaultSceneData) {
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
