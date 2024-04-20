import { Input } from "phaser";
import { TSpriteFile } from "@/types";

enum ANIMATION {
  IDLE = "idle",
  WALK = "walk",
  JUMP = "jump",
  INTERACT = "interact",
}

enum ACTION {
  IDLE,
  FORWARD,
  BACKWARD,
  JUMP,
  INTERACT,
}

enum CONTROL {
  FORWARD = Input.Keyboard.KeyCodes.D,
  BACKWARD = Input.Keyboard.KeyCodes.A,
  INTERACT = Input.Keyboard.KeyCodes.F,
  JUMP = Input.Keyboard.KeyCodes.SPACE,
}

const CONFIG = {
  X: 100,
  Y: 450,
  SCALE: 2,
  SPEED: 100,
  FRAME_NUMBER: 0,
  ANIMATION_FRAME_RATE: 2,
};

const SPRITE: TSpriteFile = {
  PATH: "char.png",
  FRAME: {
    frameWidth: 48,
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
