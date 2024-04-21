import { Physics, FX } from "phaser";

import { TenebrisScene } from "./TenebrisScene";
import { ActionsManager } from "@/lib/Actions";
import { ControlManager } from "@/lib/Controls";
import { AnimationManager } from "@/lib/Animations";
import { PLAYER } from "@/constants/player";
import { PlayerMethods, SFX, ValueOf } from "@/types";

const steps = ["step-1", "step-2", "step-3", "step-4"];

export class Player extends Physics.Arcade.Sprite implements PlayerMethods {
  private baseSpeed: number;
  private timeWalking: number;
  private footstep: number;
  private hasJumped: boolean;
  private isInteracting: boolean;

  private sfx: SFX;
  private glow: FX.Glow;
  private actions: ActionsManager<ValueOf<typeof PLAYER.ACTION>>;
  private controls: ControlManager<ValueOf<typeof PLAYER.CONTROL>>;
  private animations: AnimationManager<ValueOf<typeof PLAYER.ANIMATION>>;

  constructor(
    scene: TenebrisScene,
    x: number = PLAYER.CONFIG.X,
    y: number = PLAYER.CONFIG.Y,
    baseSpeed: number = PLAYER.CONFIG.SPEED,
    frameRate = PLAYER.CONFIG.ANIMATION_FRAME_RATE,
  ) {
    super(scene, x, y, PLAYER.NAME, PLAYER.CONFIG.FRAME_NUMBER);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scale = PLAYER.CONFIG.SCALE;
    this.setCollideWorldBounds(true);

    this.baseSpeed = baseSpeed;
    this.timeWalking = 0;
    this.footstep = 0;
    this.hasJumped = false;
    this.glow = this.postFX?.addGlow(0xffff, 0, 0);

    this.sfx = scene.sound.addAudioSprite("PLAYER");
    this.actions = new ActionsManager(2);
    this.controls = new ControlManager(scene.input.keyboard!);
    this.animations = new AnimationManager(this, PLAYER.NAME, {
      frameRate,
    });

    this.loadActions();
    this.loadAnimations();
    this.registerActions();
  }

  update() {
    this.playAnimations();

    const isMoving = this.body?.velocity.x !== 0;
    const isJumping = this.body?.velocity.y !== 0;
    if (isMoving && !isJumping) this.walk();
  }

  walk() {
    const delay = this.baseSpeed * 0.6;
    if (this.timeWalking === 0) {
      if (this.footstep >= 0) this.sfx.play(steps[this.footstep]);
      this.footstep++;
      this.footstep %= 4;
    }
    this.timeWalking = (this.timeWalking + 1) % delay;
  }

  // actions
  loadActions() {
    Object.keys(PLAYER.CONTROL).forEach((key) => {
      if (isNaN(Number(key))) return;
      this.controls.addKey(Number(key));
    });

    this.actions.add(1, PLAYER.ACTION.JUMP, (jumpBoost = 2.37) => {
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
      this.glow.outerStrength = 5;
      this.isInteracting = true;
    });
    this.controls.onRelease(PLAYER.CONTROL.INTERACT, () => {
      this.glow.outerStrength = 0;
      this.isInteracting = false;
    });
  }

  // animations
  loadAnimations() {
    this.animations.add(PLAYER.ANIMATION.IDLE, [0, 1, 1, 0]);
    this.animations.add(PLAYER.ANIMATION.WALK, [0, 1]);
    this.animations.add(PLAYER.ANIMATION.JUMP, [2, 3, 4, 1], {
      repeat: 1,
    });
    this.animations.add(PLAYER.ANIMATION.INTERACT, [4, 2]);
  }

  playAnimations() {
    const isJumping = this.body?.velocity.y !== 0;
    const isMoving = this.body?.velocity.x !== 0;

    if (this.isInteracting) {
      this.animations.play(PLAYER.ANIMATION.JUMP, false);
    }
    if (isJumping && !this.hasJumped) {
      if (!isMoving || this.timeWalking >= this.baseSpeed * 0.4) {
        this.sfx.play("step-3");
      }
      this.animations.play(PLAYER.ANIMATION.JUMP, false);
      this.hasJumped = true;
    } else if (!isJumping && this.hasJumped) {
      this.hasJumped = false;
      this.sfx.play("step-4");
      this.timeWalking = 0;
      this.footstep = -1;
    }

    if (!this.hasJumped && isMoving) {
      this.animations.play(PLAYER.ANIMATION.WALK);
    }
    if (!isJumping && !isMoving) {
      this.animations.play(PLAYER.ANIMATION.IDLE);
    }
  }
}
