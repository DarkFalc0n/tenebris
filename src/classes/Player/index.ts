import { Physics, Types } from "phaser";
import { TenebrisScene } from "../TenebrisScene";
import { PLAYER } from "@/constants/player";
import { PlayerBody } from "./body";
import { PlayerEnergy } from "./light";
import { IConfig } from "./base";

const defaultConfig: IConfig = {
  x: PLAYER.CONFIG.X,
  y: PLAYER.CONFIG.Y,
  baseSpeed: PLAYER.CONFIG.SPEED,
  frameRate: PLAYER.CONFIG.ANIMATION_FRAME_RATE,
};

export class Player {
  public x: number;
  public y: number;
  public height: number;
  public width: number;

  private physics: Physics.Arcade.ArcadePhysics;
  private body: Physics.Arcade.Sprite;
  private energy: Physics.Arcade.Sprite;

  constructor(scene: TenebrisScene, newConfig?: Partial<IConfig>) {
    const config = { ...defaultConfig, ...newConfig };
    this.body = new PlayerBody(scene, config);
    this.energy = new PlayerEnergy(scene, config);
    this.physics = scene.physics;

    this.x = this.body.x;
    this.y = this.body.y;
    this.height = this.body.height;
    this.width = this.body.width;
  }

  collide(...objects: Types.Physics.Arcade.ArcadeColliderType[]) {
    for (const object of objects) {
      this.physics.add.collider(this.body, object);
      this.physics.add.collider(this.energy, object);
    }
  }

  update() {
    this.body.update();
    this.energy.update();
  }
}
