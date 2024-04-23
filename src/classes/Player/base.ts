import { Physics } from "phaser";

import { TenebrisScene } from "../TenebrisScene";
import { ActionsManager } from "@/lib/Actions";
import { ControlManager } from "@/lib/Controls";
import { AnimationManager } from "@/lib/Animations";
import { PLAYER } from "@/constants/player";
import { Action, ValueOf } from "@/types";

export interface IConfig {
  x: number;
  y: number;
  baseSpeed: number;
  frameRate: number;
}

export class PlayerBase extends Physics.Arcade.Sprite {
  protected baseSpeed: number;
  private hasJumped = false;

  private actions: ActionsManager<ValueOf<typeof PLAYER.ACTION>>;
  private controls: ControlManager<ValueOf<typeof PLAYER.CONTROL>>;
  private animations: AnimationManager<ValueOf<typeof PLAYER.ANIMATION>>;

  constructor(
    scene: TenebrisScene,
    texture: string,
    { x, y, baseSpeed, frameRate }: IConfig,
  ) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scale = PLAYER.CONFIG.SCALE;
    this.baseSpeed = baseSpeed;
    this.setCollideWorldBounds(true);

    this.actions = new ActionsManager(2);
    this.controls = new ControlManager(scene.input.keyboard!);
    this.animations = new AnimationManager(this, texture, {
      frameRate,
    });

    this.loadActions();
    this.loadAnimations();
    this.registerActions();
  }

  protected stopWalking() {
    this.setVelocityX(0);
  }

  protected walkForward(speedBoost = 1) {
    this.flipX = false;
    this.setVelocityX(this.baseSpeed * speedBoost);
  }

  protected walkBackward(speedBoost = 1) {
    this.flipX = true;
    this.setVelocityX(-this.baseSpeed * speedBoost);
  }

  protected jump(jumpBoost = 2.37) {
    this.setVelocityY(-this.baseSpeed * jumpBoost);
  }

  loadActions() {
    Object.keys(PLAYER.CONTROL).forEach((key) => {
      if (isNaN(Number(key))) return;
      this.controls.addKey(Number(key));
    });

    this.actions.add(1, PLAYER.ACTION.JUMP, () => this.jump());
    this.actions.add(0, PLAYER.ACTION.FORWARD, () => this.walkForward());
    this.actions.add(0, PLAYER.ACTION.BACKWARD, () => this.walkBackward());
    this.actions.setDefault(0, PLAYER.ACTION.STOP, () => this.stopWalking());
  }

  registerActions() {
    this.controls.onPress(PLAYER.CONTROL.JUMP, () => {
      if (this.hasJumped) return;
      this.actions.start(PLAYER.ACTION.JUMP);
    });
    this.controls.onRelease(PLAYER.CONTROL.JUMP, () => {
      this.actions.end(PLAYER.ACTION.JUMP);
    });

    this.controls.onPress(PLAYER.CONTROL.FORWARD, () => {
      this.actions.start(PLAYER.ACTION.FORWARD);
    });
    this.controls.onRelease(PLAYER.CONTROL.FORWARD, () => {
      this.actions.end(PLAYER.ACTION.FORWARD);
    });

    this.controls.onPress(PLAYER.CONTROL.BACKWARD, () => {
      this.actions.start(PLAYER.ACTION.BACKWARD);
    });
    this.controls.onRelease(PLAYER.CONTROL.BACKWARD, () => {
      this.actions.end(PLAYER.ACTION.BACKWARD);
    });
  }

  loadAnimations() {
    this.animations.add(PLAYER.ANIMATION.IDLE, [0, 1, 1, 0]);
    this.animations.add(PLAYER.ANIMATION.WALK, [5, 6, 7, 8]);
    this.animations.add(PLAYER.ANIMATION.JUMP, [2, 3, 4, 1], {
      repeat: 1,
    });
  }

  playAnimations({ beforeJump, afterJump }: Partial<Record<string, Action>>) {
    const isJumping = this.body?.velocity.y !== 0;
    const isMoving = this.body?.velocity.x !== 0;

    if (isJumping && !this.hasJumped) {
      if (beforeJump) beforeJump();
      this.animations.play(PLAYER.ANIMATION.JUMP, false);
      this.hasJumped = true;
    } else if (!isJumping && this.hasJumped) {
      this.hasJumped = false;
      if (afterJump) afterJump();
    }

    if (!this.hasJumped && isMoving) {
      this.animations.play(PLAYER.ANIMATION.WALK);
    }
    if (!isJumping && !isMoving) {
      this.animations.play(PLAYER.ANIMATION.IDLE);
    }
  }

  update(actions: Partial<Record<string, Action>> = {}) {
    this.playAnimations(actions);
  }
}
