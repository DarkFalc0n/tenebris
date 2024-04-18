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
    this.control = scene.input.keyboard!.addKeys(
      PLAYER.CONTROL,
    ) as Control;
  }

  // actions
  loadActions() {
    this.actions = new ActionsManager(PLAYER.ACTION.IDLE);

    this.actions.add(
      PLAYER.ACTION.IDLE,
      () => {
        this.setVelocityX(0);
      },
      0,
    );

    this.actions.add(
      PLAYER.ACTION.FORWARD,
      (speedBoost = 1) => {
        this.flipX = true;
        this.setVelocityX(this.baseSpeed * speedBoost);
      },
      1,
    );

    this.actions.add(
      PLAYER.ACTION.BACKWARD,
      (speedBoost = 1) => {
        this.flipX = false;
        this.setVelocityX(-this.baseSpeed * speedBoost);
      },
      1,
    );

    this.actions.add(
      PLAYER.ACTION.JUMP,
      () => {
        this.setVelocityY(-this.baseSpeed * 1.5);
      },
      2,
    );
  }

  registerActions() {
    this.control.JUMP.on("down", () => {
      if (this.hasJumped) return;
      this.actions.start(PLAYER.ACTION.JUMP);
    });
    this.control.JUMP.on("up", () => {
      this.actions.end(PLAYER.ACTION.JUMP);
    });

    this.control.FORWARD.on("down", () => {
      this.actions.start(PLAYER.ACTION.FORWARD);
    });
    this.control.FORWARD.on("up", () => {
      this.actions.end(PLAYER.ACTION.FORWARD);
    });

    this.control.BACKWARD.on("down", () => {
      this.actions.start(PLAYER.ACTION.BACKWARD);
    });
    this.control.BACKWARD.on("up", () => {
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

    this.animations.add(PLAYER.ANIMATION.IDLE, [0, 4]);
    this.animations.add(
      PLAYER.ANIMATION.WALK,
      [0, 2, 1, 2],
    );
    this.animations.add(PLAYER.ANIMATION.JUMP, [1, 0], {
      repeat: 1,
    });
  }

  playAnimations() {
    const isJumping = this.body?.velocity.y !== 0;
    const isMoving = this.body?.velocity.x !== 0;

    if (isJumping && !this.hasJumped) {
      this.hasJumped = true;
      this.animations.play(PLAYER.ANIMATION.JUMP, false);
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
