import { Input, Physics } from "phaser";

import { TenebrisScene } from "./TenebrisScene";
import { ActionsManager } from "@/lib/Actions";
import { AnimationManager } from "@/lib/Animations";
import { PLAYER } from "@/constants/player";
import { PlayerMethods, ValueOf } from "@/types";

type Control = Record<
  keyof typeof PLAYER.ACTION,
  Input.Keyboard.Key
>;

export class Player
  extends Physics.Arcade.Sprite
  implements PlayerMethods
{
  // TODO: manage these locks from ControlsManager
  private lockJump: boolean;
  private lockForward: boolean;
  private lockBackward: boolean;
  private baseSpeed: number;
  private hasJumped: boolean;

  private control: Control;
  private actions: ActionsManager<
    ValueOf<typeof PLAYER.ACTION>
  >;
  private animations: AnimationManager<
    ValueOf<typeof PLAYER.ANIMATION>
  >;

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
    this.lockJump = false;
    this.lockForward = false;
    this.lockBackward = false;
    this.control = scene.input.keyboard!.addKeys(
      PLAYER.CONTROL,
    ) as Control;
  }

  // actions
  loadActions() {
    // TODO: find better way to pass these values, e.g: chaining
    this.actions = new ActionsManager(2);
    // this.actions.blockThread(1);

    this.actions.add(
      PLAYER.ACTION.JUMP,
      () => {
        this.setVelocityY(-this.baseSpeed * 2.37);
      },
      1,
    );

    this.actions.add(
      PLAYER.ACTION.IDLE,
      () => {
        this.setVelocityX(0);
      },
      0,
      true,
    );

    this.actions.add(
      PLAYER.ACTION.FORWARD,
      (speedBoost = 1) => {
        this.flipX = false;
        this.setVelocityX(this.baseSpeed * speedBoost);
      },
      0,
    );

    this.actions.add(
      PLAYER.ACTION.BACKWARD,
      (speedBoost = 1) => {
        this.flipX = true;
        this.setVelocityX(-this.baseSpeed * speedBoost);
      },
      0,
    );
  }

  registerActions() {
    // TODO: fix ugly code
    this.control.JUMP.on("down", () => {
      if (this.lockJump || this.hasJumped) return;
      this.lockJump = true;
      this.actions.start(PLAYER.ACTION.JUMP);
    });
    this.control.JUMP.on("up", () => {
      if (!this.lockJump) return;
      this.lockJump = false;
      this.actions.end(PLAYER.ACTION.JUMP);
    });

    this.control.FORWARD.on("down", () => {
      if (this.lockForward) return;
      this.lockForward = true;
      this.actions.start(PLAYER.ACTION.FORWARD);
    });
    this.control.FORWARD.on("up", () => {
      if (!this.lockForward) return;
      this.lockForward = false;
      this.actions.end(PLAYER.ACTION.FORWARD);
    });

    this.control.BACKWARD.on("down", () => {
      if (this.lockBackward) return;
      this.lockBackward = true;
      this.actions.start(PLAYER.ACTION.BACKWARD);
    });
    this.control.BACKWARD.on("up", () => {
      if (!this.lockBackward) return;
      this.lockBackward = false;
      this.actions.end(PLAYER.ACTION.BACKWARD);
    });
  }

  // animations
  loadAnimations(
    frameRate = PLAYER.CONFIG.ANIMATION_FRAME_RATE,
  ) {
    this.animations = new AnimationManager(
      this,
      PLAYER.NAME,
      { frameRate },
    );

    this.animations.add(
      PLAYER.ANIMATION.IDLE,
      [0, 0, 1, 1],
    );
    this.animations.add(PLAYER.ANIMATION.WALK, [0, 1]);
    this.animations.add(
      PLAYER.ANIMATION.JUMP,
      [2, 3, 4, 1],
      {
        repeat: 1,
      },
    );
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
    if (!isJumping && !isMoving) {
      this.animations.play(PLAYER.ANIMATION.IDLE);
    }
  }
}
