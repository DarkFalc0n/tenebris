import { GameObjects, Time } from "phaser";
import { TenebrisScene } from "./TenebrisScene";

interface TSubtitle {
  text: string;
  timeOut: number;
}

export class SubtitleManager {
  private subtitles: TSubtitle[] = [];
  private timer: Time.Clock;
  private currentSubtitle: GameObjects.Text;

  constructor(scene: TenebrisScene, color = "#000") {
    this.timer = scene.time;
    this.currentSubtitle = scene.add
      .text(
        (scene.sys.game.config.width as number) / 2,
        (scene.sys.game.config.height as number) - 100,
        "",
        {
          fontSize: 32,
          color,
        },
      )
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(1000);
  }

  public add(text: string, timeOut = 3000) {
    this.subtitles.push({ text, timeOut });
  }

  public show() {
    // this.currentSubtitle.setText(text);
    // this.currentSubtitle.scene.time.delayedCall(timeOut, () => {
    //   this.currentSubtitle.setVisible(false);
    //   this.subtitles.shift();
    //   if (this.subtitles.length > 0) {
    //     this.currentSubtitle.setText(this.subtitles[0]);
    //     this.currentSubtitle.setVisible(true);
    //   }
    // });
  }
}
