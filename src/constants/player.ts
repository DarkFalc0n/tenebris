import { Input } from "phaser";
import SFX from "../../public/assets/audio/player-sfx";
import { TAudioSpriteFile, TSpriteFile } from "@/types";

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

enum BATTERY {
  IDLE = 0.005,
  WALK = 0.04,
  JUMP = 0.1,
}

const CONFIG = {
  X: 100,
  Y: 450,
  SCALE: 2,
  SPEED: 100,
  FRAME_NUMBER: 0,
  ANIMATION_FRAME_RATE: 4,
};

const frame = {
  frameWidth: 48,
  frameHeight: 64,
};

const BODY: TSpriteFile = {
  name: "body",
  path: "player-body.png",
  frame,
};

const GLOW: TSpriteFile = {
  name: "light",
  path: "player-glow.png",
  frame,
};

const SPRITE = {
  BODY,
  GLOW,
} as const;

const AUDIO: TAudioSpriteFile = {
  name: "player-sfx",
  json: "player-sfx.json",
  src: "player-sfx.mp3",
};

export const PLAYER = {
  CONFIG,
  ACTION,
  CONTROL,
  SFX,
  ANIMATION,
  SPRITE,
  AUDIO,
  BATTERY,
};
