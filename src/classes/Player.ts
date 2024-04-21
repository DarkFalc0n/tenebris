import { Physics } from "phaser";

import { TenebrisScene } from "./TenebrisScene";
import { ActionsManager } from "@/lib/Actions";
import { ControlManager } from "@/lib/Controls";
import { AnimationManager } from "@/lib/Animations";
import { PLAYER } from "@/constants/player";
import { PlayerMethods, ValueOf } from "@/types";

export class Player extends Physics.Arcade.Sprite implements PlayerMethods {
  private baseSpeed: number;
  private hasJumped: boolean;
  private isInteracting: boolean;

  private actions: ActionsManager<ValueOf<typeof PLAYER.ACTION>>;
  private controls: ControlManager<ValueOf<typeof PLAYER.CONTROL>>;
  private animations: AnimationManager<ValueOf<typeof PLAYER.ANIMATION>>;

  constructor(
    scene: TenebrisScene,
    x: number = PLAYER.CONFIG.X,
    y: number = PLAYER.CONFIG.Y,
    baseSpeed: number = PLAYER.CONFIG.SPEED,
  ) {
    super(scene, x, y, PLAYER.NAME, PLAYER.CONFIG.FRAME_NUMBER);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scale = PLAYER.CONFIG.SCALE;
    this.setCollideWorldBounds(true);

    this.baseSpeed = baseSpeed;
    this.hasJumped = false;
    this.controls = new ControlManager(scene.input.keyboard!);

    this.loadActions();
    this.loadAnimations();
  }

  update() {
    this.registerActions();
    this.playAnimations();
  }

  // actions
  loadActions() {
    Object.keys(PLAYER.CONTROL).forEach((key) => {
      if (isNaN(Number(key))) return;
      this.controls.addKey(Number(key));
    });

    this.actions = new ActionsManager(2);

    this.actions.add(1, PLAYER.ACTION.JUMP, (jumpBoost = 1.5) => {
      this.setVelocityY(-this.baseSpeed * jumpBoost);
    });

    this.actions.setDefault(0, PLAYER.ACTION.STOP, () => {
      this.setVelocityX(0);
    });

    this.actions.add(0, PLAYER.ACTION.FORWARD, (speedBoost = 1) => {
      this.flipX = false;
      this.setVelocityX(this.baseSpeed * speedBoost);
    });

    this.actions.add(0, PLAYER.ACTION.BACKWARD, (speedBoost = 1) => {
      this.flipX = true;
      this.setVelocityX(-this.baseSpeed * speedBoost);
    });
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
    this.controls.onPress(PLAYER.CONTROL.INTERACT, () => {
      this.isInteracting = true;
    });
    this.controls.onRelease(PLAYER.CONTROL.INTERACT, () => {
      this.isInteracting = false;
    });
  }

  // animations
  loadAnimations(frameRate = PLAYER.CONFIG.ANIMATION_FRAME_RATE) {
    this.animations = new AnimationManager(this, PLAYER.NAME, { frameRate });

    this.animations.add(PLAYER.ANIMATION.IDLE, [0, 1, 1, 0]);
    this.animations.add(PLAYER.ANIMATION.WALK, [0, 1]);
    this.animations.add(PLAYER.ANIMATION.JUMP, [1, 0], {
      repeat: 1,
    });
    this.animations.add(PLAYER.ANIMATION.INTERACT, [1], {
      repeat: 1,
    });
  }

  playAnimations() {
    const isJumping = this.body?.velocity.y !== 0;
    const isMoving = this.body?.velocity.x !== 0;

    if (isJumping && !this.hasJumped) {
      this.animations.play(PLAYER.ANIMATION.JUMP, false);
      this.hasJumped = true;
    } else if (!isJumping && this.hasJumped) {
      this.hasJumped = false;
    }

    if (!this.hasJumped && isMoving) {
      this.animations.play(PLAYER.ANIMATION.WALK);
    }
    if (this.isInteracting) {
      this.animations.play(PLAYER.ANIMATION.INTERACT);
    }
    if (!isJumping && !isMoving) {
      this.animations.play(PLAYER.ANIMATION.IDLE);
    }
  }
}
