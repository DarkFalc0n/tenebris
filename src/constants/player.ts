import { Input } from "phaser";
import { TSpriteFile } from "@/types";

enum ANIMATION {
  IDLE = "idle",
  WALK = "walk",
  JUMP = "jump",
}

enum ACTION {
  IDLE,
  JUMP,
  FORWARD,
  BACKWARD,
}

const CONFIG = {
  X: 100,
  Y: 450,
  SCALE: 2,
  SPEED: 100,
  FRAME_NUMBER: 0,
  ANIMATION_FRAME_RATE: 2,
};
const CONTROL: Record<
  Exclude<keyof typeof ACTION, "IDLE">,
  number
> = {
  FORWARD: Input.Keyboard.KeyCodes.D,
  BACKWARD: Input.Keyboard.KeyCodes.A,
  JUMP: Input.Keyboard.KeyCodes.SPACE,
};

const SPRITE: TSpriteFile = {
  PATH: "player.png",
  FRAME: {
    frameWidth: 32,
    frameHeight: 64,
  },
};

export const PLAYER = {
  NAME: "PLAYER",
  ANIMATION,
  SPRITE,
  ACTION,
  CONFIG,
  CONTROL,
};
