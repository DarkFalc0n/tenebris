import { Input, Physics } from "phaser";

import { TenebrisScene } from "./TenebrisScene";
import { ActionsManager } from "@/lib/Actions";
import { PLAYER } from "@/constants/player";
import { PlayerMethods } from "@/types";

type Control = Record<
  keyof typeof PLAYER.ACTION,
  Input.Keyboard.Key
>;

export class Player
  extends Physics.Arcade.Sprite
  implements PlayerMethods
{
  private baseSpeed: number;
  private hasJumped: boolean;
  private control: Control;
  private actions: ActionsManager;

  constructor(
    scene: TenebrisScene,
    x: number = PLAYER.CONFIG.X,
    y: number = PLAYER.CONFIG.Y,
    baseSpeed: number = PLAYER.CONFIG.SPEED,
  ) {
    super(
      scene,
      x,
      y,
      PLAYER.NAME,
      PLAYER.CONFIG.FRAME_NUMBER,
    );

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scale = PLAYER.CONFIG.SCALE;
    this.setCollideWorldBounds(true);

    this.baseSpeed = baseSpeed;
    this.hasJumped = false;
    this.control = scene.input.keyboard!.addKeys(
      PLAYER.CONTROL,
    ) as Control;
    this.actions = new ActionsManager(
      PLAYER.CONFIG.DEFAULT_ACTION,
    );
  }

  loadActions() {
    this.actions.add(PLAYER.CONFIG.DEFAULT_ACTION, () => {
      this.setVelocityX(0);
    });

    this.actions.add(
      PLAYER.ACTION.FORWARD,
      (speedBoost = 1) => {
        this.flipX = true;
        this.setVelocityX(this.baseSpeed * speedBoost);
      },
    );

    this.actions.add(
      PLAYER.ACTION.BACKWARD,
      (speedBoost = 1) => {
        this.flipX = false;
        this.setVelocityX(-this.baseSpeed * speedBoost);
      },
    );

    this.actions.add(PLAYER.ACTION.JUMP, () => {
      this.setVelocityY(-this.baseSpeed * 1.5);
    });
  }

  registerActions() {
    this.control.JUMP.on("down", () => {
      if (!this.hasJumped) {
        this.actions.start(PLAYER.ACTION.JUMP);
      }
    });
    this.control.FORWARD.on("down", () => {
      this.actions.start(PLAYER.ACTION.FORWARD);
    });
    this.control.BACKWARD.on("down", () => {
      this.actions.start(PLAYER.ACTION.BACKWARD);
    });
    this.control.JUMP.on("up", () => {
      this.actions.end(PLAYER.ACTION.JUMP);
    });
    this.control.FORWARD.on("up", () => {
      this.actions.end(PLAYER.ACTION.FORWARD);
    });
    this.control.BACKWARD.on("up", () => {
      this.actions.end(PLAYER.ACTION.BACKWARD);
    });
  }

  loadAnimations(
    frameRate = PLAYER.CONFIG.ANIMATION_FRAME_RATE,
  ) {
    this.scene.anims.create({
      key: PLAYER.ANIMATION.IDLE,
      frames: [
        { key: PLAYER.NAME, frame: 0 },
        { key: PLAYER.NAME, frame: 4 },
      ],
      frameRate,
      repeat: -1,
    });

    this.scene.anims.create({
      key: PLAYER.ANIMATION.WALK,
      frames: [
        { key: PLAYER.NAME, frame: 0 },
        { key: PLAYER.NAME, frame: 2 },
        { key: PLAYER.NAME, frame: 1 },
        { key: PLAYER.NAME, frame: 2 },
      ],
      frameRate,
      repeat: -1,
    });

    this.scene.anims.create({
      key: PLAYER.ANIMATION.JUMP,
      frames: [
        { key: PLAYER.NAME, frame: 1 },
        { key: PLAYER.NAME, frame: 0 },
      ],
      frameRate: frameRate * 1.5,
      repeat: 1,
    });
  }

  playAnimations() {
    const isJumping = this.body?.velocity.y !== 0;
    const isMoving = this.body?.velocity.x !== 0;
    if (isJumping && !this.hasJumped) {
      this.hasJumped = true;
      this.anims.play(PLAYER.ANIMATION.JUMP);
    } else if (!isJumping && this.hasJumped) {
      this.hasJumped = false;
    }

    if (!this.hasJumped && isMoving) {
      this.anims.play(PLAYER.ANIMATION.WALK, true);
    }
    if (!isJumping && !isMoving) {
      this.anims.play(PLAYER.ANIMATION.IDLE, true);
    }
  }
}
