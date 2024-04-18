import { Input } from "phaser";

enum ANIMATION {
  IDLE = "idle",
  WALK = "walk",
  JUMP = "jump",
}

enum ACTION {
  JUMP = "jump",
  FORWARD = "forward",
  BACKWARD = "backward",
}

const CONFIG = {
  X: 100,
  Y: 450,
  SCALE: 2,
  SPEED: 100,
  FRAME_NUMBER: 0,
  DEFAULT_ACTION: "idle",
  ANIMATION_FRAME_RATE: 2,
};

const CONTROL: Record<keyof typeof ACTION, number> = {
  FORWARD: Input.Keyboard.KeyCodes.D,
  BACKWARD: Input.Keyboard.KeyCodes.A,
  JUMP: Input.Keyboard.KeyCodes.SPACE,
};

export const PLAYER = {
  NAME: "player",
  ANIMATION,
  ACTION,
  CONFIG,
  CONTROL,
};
