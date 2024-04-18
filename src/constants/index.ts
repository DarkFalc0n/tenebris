import { PLAYER } from "./player";

enum SCENES {
  BOOT = "boot",
  TEXT_SCENE = "textScene",
}

const IMAGES = {
  BACKGROUND: "bg.png",
} as const;

const SPRITES = {
  PLAYER: PLAYER.SPRITE,
} as const;

const CONFIG = {
  GRAVITY: 500,
};

export const CONSTANTS = {
  SCENES,
  IMAGES,
  SPRITES,
  CONFIG,
  ASSET_DIR: "assets",
  IMAGE_DIR: "images",
  SPRITE_DIR: "sprites",
  AUDIO_DIR: "audio",
};
