import { Physics } from "phaser";
import { TenebrisScene } from "./tenebrisScene";

export class Player extends Physics.Arcade.Sprite {
  private baseSpeed = 100;

  constructor(
    scene: TenebrisScene,
    x: number = 100,
    y: number = 450,
  ) {
    super(scene, x, y, "player", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scale = 2;

    this.setCollideWorldBounds(true);
  }

  loadAnimations(frameRate: number = 10) {
    this.scene.anims.create({
      key: "idle",
      frames: [
        { key: "player", frame: 0 },
        { key: "player", frame: 4 },
      ],
      frameRate,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "walk",
      frames: [
        { key: "player", frame: 0 },
        { key: "player", frame: 2 },
        { key: "player", frame: 1 },
        { key: "player", frame: 2 },
      ],
      frameRate,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "jump",
      frames: [
        { key: "player", frame: 0 },
        { key: "player", frame: 1 },
      ],
      frameRate,
      repeat: -1,
    });
  }

  idle() {
    this.flipX = false;
    this.anims.play("idle", true);
  }

  walk(speedBoost: number = 1) {
    this.flipX = speedBoost > 0 ? true : false;
    this.setVelocityX(this.baseSpeed * speedBoost);
    this.anims.play("walk", true);
  }

  jump() {
    this.setVelocityY(-200);
    this.anims.play("jump", true);
  }
}
