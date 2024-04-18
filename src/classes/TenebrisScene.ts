import { Scene } from "phaser";

export class TenebrisScene extends Scene {
  private fadeTime: number;

  init(data: { fadeTime?: number }) {
    this.fadeTime = data.fadeTime ?? 1000;
  }

  create() {
    this.cameras.main.fadeIn(this.fadeTime, 0, 0, 0);
  }
}
