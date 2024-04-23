import { PlayerBase, type IConfig } from "./base";
import { TenebrisScene } from "../TenebrisScene";
import { PLAYER } from "@/constants/player";

export class PlayerEnergy extends PlayerBase {
  constructor(scene: TenebrisScene, config: IConfig) {
    super(scene, PLAYER.SPRITE.ENERGY.name, config);
    this.postFX.addBloom(0xffffff); // remove this for sharper glow
    this.postFX.addGlow(0xffff, 2, 0);
  }

  update() {
    super.update();
  }
}
