import { Cameras, Physics, Types } from "phaser";
import { TenebrisScene } from "../TenebrisScene";
import { PLAYER } from "@/constants/player";
import { PlayerBody } from "./body";
import { PlayerGlow } from "./glow";
import { IConfig } from "./base";

const defaultConfig: IConfig = {
  x: PLAYER.CONFIG.X,
  y: PLAYER.CONFIG.Y,
  baseSpeed: PLAYER.CONFIG.SPEED,
  frameRate: PLAYER.CONFIG.ANIMATION_FRAME_RATE,
};

export class Player {
  private physics: Physics.Arcade.ArcadePhysics;
  public body: PlayerBody;
  private glow: PlayerGlow;

  constructor(scene: TenebrisScene, newConfig?: Partial<IConfig>) {
    const config = { ...defaultConfig, ...newConfig };
    this.body = new PlayerBody(scene, config);
    this.glow = new PlayerGlow(scene, config);
    this.physics = scene.physics;
  }

  bindCamera(camera: Cameras.Scene2D.Camera) {
    camera.startFollow(this.body, true, 0.6, 0, -80, 0);
  }

  collide(object: Types.Physics.Arcade.ArcadeColliderType) {
    this.physics.add.collider(this.body, object);
    this.physics.add.collider(this.glow, object);
  }

  startMovement() {
    this.body.startMovement();
    this.glow.startMovement();
  }

  stopMovement() {
    this.body.stopMovement();
    this.glow.stopMovement();
  }

  changeColor(color: number) {
    this.glow.setColor(color);
  }

  update() {
    this.body.update();
    this.glow.update();
    if (this.body.energy > 0) this.glow.setOpacity(this.body.energy / 100);
  }
}
