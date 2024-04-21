import { Input } from "phaser";
import { TAudioFile, TSpriteFile } from "@/types";

enum ANIMATION {
  IDLE = "idle",
  WALK = "walk",
  JUMP = "jump",
  INTERACT = "interact",
}

enum ACTION {
  STOP,
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
  ANIMATION_FRAME_RATE: 4,
};

const SPRITE: TSpriteFile = {
  path: "char.png",
  frame: {
    frameWidth: 48,
    frameHeight: 64,
  },
};

const AUDIO: TAudioFile = {
  json: "player-walking.json",
  src: "player-walking.mp3",
};

export const PLAYER = {
  NAME: "PLAYER",
  CONFIG,
  ACTION,
  CONTROL,
  ANIMATION,
  SPRITE,
  AUDIO,
};
