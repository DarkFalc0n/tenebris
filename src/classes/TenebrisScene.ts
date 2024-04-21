import { Scene } from "phaser";

export class TenebrisScene extends Scene {
  private fadeTime: number;
  fpsMonitor: Phaser.GameObjects.Text;

  init(data: { fadeTime?: number }) {
    this.fadeTime = data.fadeTime ?? 1000;

    // Create the fpsMonitor text object
    this.fpsMonitor = this.add
      .text(10, 10, "FPS: 0", {
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#000",
      })
      .setScrollFactor(0)
      .setDepth(1000);
  }

  create() {
    this.cameras.main.fadeIn(this.fadeTime, 0, 0, 0);
  }

  update() {
    // Check if the fpsMonitor exists, if it does, update the text
    if (this.fpsMonitor) {
      this.fpsMonitor.setText(
        "FPS: " + Math.floor(this.game.loop.actualFps),
      );
    }
  }
}
