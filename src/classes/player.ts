import { Input, Physics } from "phaser";

import { TenebrisScene } from "./tenebrisScene";
import { ActionsManager } from "@/lib/actions";

type Control = Record<string, Input.Keyboard.Key>;

export class Player extends Physics.Arcade.Sprite {
  private baseSpeed: number;
  private control: Control;
  private actions: ActionsManager;

  constructor(
    scene: TenebrisScene,
    x: number = 100,
    y: number = 450,
    baseSpeed: number = 100,
  ) {
    super(scene, x, y, "player", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scale = 2;
    this.setCollideWorldBounds(true);

    this.baseSpeed = baseSpeed;
    this.control = scene.input.keyboard!.addKeys({
      forward: Input.Keyboard.KeyCodes.D,
      backward: Input.Keyboard.KeyCodes.A,
      jump: Input.Keyboard.KeyCodes.SPACE,
    }) as Control;
    this.actions = new ActionsManager("idle");
  }

  loadActions() {
    this.actions.add("idle", () => {
      this.setVelocityX(0);
    });

    this.actions.add("forward", (speedBoost = 1) => {
      this.flipX = true;
      this.setVelocityX(this.baseSpeed * speedBoost);
    });

    this.actions.add("backward", (speedBoost = 1) => {
      this.flipX = false;
      this.setVelocityX(-this.baseSpeed * speedBoost);
    });

    this.actions.add("jump", () => {
      this.setVelocityY(-this.baseSpeed * 1.5);
    });
  }

  registerActions() {
    this.control.jump.on("down", () => {
      if (this.body!.touching.down) {
        this.actions.start("jump");
      }
    });
    this.control.forward.on("down", () => {
      this.actions.start("forward");
    });
    this.control.backward.on("down", () => {
      this.actions.start("backward");
    });
    this.control.jump.on("up", () => {
      this.actions.end("jump");
    });
    this.control.forward.on("up", () => {
      this.actions.end("forward");
    });
    this.control.backward.on("up", () => {
      this.actions.end("backward");
    });
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
        { key: "player", frame: 1 },
        { key: "player", frame: 0 },
      ],
      frameRate: frameRate * 2,
      repeat: 1,
    });
  }

  playAnimations() {
    const isJumping = this.body?.velocity.y !== 0;
    const isMoving = this.body?.velocity.x !== 0;
    if (isJumping) {
      this.anims.play("jump", true);
    }
    if (isMoving) {
      this.anims.play("walk", true);
    }
    if (!isJumping && !isMoving) {
      this.anims.play("idle", true);
    }
  }
}
