import { PlayerBase, IConfig } from "./base";
import { TenebrisScene } from "../TenebrisScene";
import { PLAYER } from "@/constants/player";
import { FX } from "phaser";

export class PlayerGlow extends PlayerBase {
  private glow: FX.Glow;

  constructor(scene: TenebrisScene, config: IConfig) {
    super(scene, PLAYER.SPRITE.GLOW.name, config);
    this.postFX.addBloom(0xffffff);
    this.glow = this.postFX.addGlow(0xffff, 2, 0);
  }

  setColor(color: number) {
    this.glow.color = color;
  }

  setOpacity(opacity: number) {
    this.alpha = opacity;
  }

  update() {
    super.update();
  }
}
