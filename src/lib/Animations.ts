import { Types, Physics } from "phaser";

type AnimationConfig = Omit<
  Types.Animations.Animation,
  "key" | "frames"
>;

export class AnimationManager<TAnimation extends string> {
  private sprite: string;
  private object: Physics.Arcade.Sprite;
  private baseConfig: AnimationConfig;

  constructor(
    object: Physics.Arcade.Sprite,
    sprite: string,
    baseConfig?: AnimationConfig,
  ) {
    this.sprite = sprite;
    this.object = object;
    this.baseConfig = baseConfig ?? {
      frameRate: 10,
      repeat: -1,
    };
  }

  add(
    key: TAnimation,
    frames: number[],
    config?: AnimationConfig,
  ) {
    this.object.anims.create({
      key,
      frames: this.object.anims.generateFrameNumbers(
        this.sprite,
        { frames },
      ),
      ...{
        ...this.baseConfig,
        ...config,
      },
    });
  }

  play(key: TAnimation, ignore = true) {
    this.object.play(key, ignore);
  }
}
