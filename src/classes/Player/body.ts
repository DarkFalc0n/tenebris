import { IConfig, PlayerBase } from "./base";
import { TenebrisScene } from "../TenebrisScene";
import { PLAYER } from "@/constants/player";
import { SFX } from "@/types";

const steps = [
  PLAYER.SFX.STEP_1,
  PLAYER.SFX.STEP_2,
  PLAYER.SFX.STEP_3,
  PLAYER.SFX.STEP_4,
];

export class PlayerBody extends PlayerBase {
  public energy = 100;
  private timeWalking = 0;
  private footsteps = 0;
  private walkingDelay: number;

  private sfx: SFX;

  constructor(scene: TenebrisScene, config: IConfig) {
    super(scene, PLAYER.SPRITE.BODY.name, config);

    this.walkingDelay = this.baseSpeed * 0.4;
    this.sfx = scene.sound.addAudioSprite(PLAYER.AUDIO.name);
  }

  private resetWalkingProgress(pushBack: number) {
    this.timeWalking = 0;
    this.footsteps = pushBack;
  }

  private playWalkingSound() {
    if (this.timeWalking === 0) {
      if (this.footsteps >= 0) this.sfx.play(steps[this.footsteps]);
      this.footsteps++;
      this.footsteps %= 4;
    }
    this.timeWalking = (this.timeWalking + 1) % this.walkingDelay;
  }

  private reduceEnergy(unit: number) {
    this.energy = Math.max(0, this.energy - unit);
  }

  refillEnergy() {
    this.energy = 100;
  }

  update() {
    const isMoving = this.body?.velocity.x !== 0;
    const isJumping = this.body?.velocity.y !== 0;

    super.update({
      beforeJump: () => {
        if (!isMoving || this.timeWalking >= this.walkingDelay * 0.4) {
          this.sfx.play(PLAYER.SFX.STEP_3);
        }
      },
      afterJump: () => {
        this.sfx.play(PLAYER.SFX.STEP_4);
        this.resetWalkingProgress(-1);
      },
    });

    if (!isMoving) this.resetWalkingProgress(-1);
    if (isMoving && !isJumping) this.playWalkingSound();

    if (!this.canMove) return;
    if (!isMoving && !isJumping) this.reduceEnergy(PLAYER.BATTERY.IDLE);
    if (isMoving) this.reduceEnergy(PLAYER.BATTERY.WALK);
    if (isJumping) this.reduceEnergy(PLAYER.BATTERY.JUMP);

    if (Math.round(this.energy) === 25) {
      this.sfx.play(PLAYER.SFX.BATTERY_LOW);
    }
    // if (Math.round(this.energy) === 1) {
    //   this.stopMovement();
    //   this.sfx.play(PLAYER.SFX.RESPAWN);
    // }
  }
}
