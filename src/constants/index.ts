enum SCENES {
  BOOT = "boot",
  TEXT_SCENE = "text-scene",
}

enum BGM {
  BGM_01 = "bgm-01.mp3",
  BGM_02 = "bgm-02.mp3",
  BGM_03 = "bgm-03.mp3",
}

enum IMAGES {
  BACKGROUND = "bg.png",
}

const CONFIG = {
  GRAVITY: { x: 0, y: 500 },
} as const;

export const CONSTANTS = {
  SCENES,
  IMAGES,
  BGM,
  CONFIG,
  ASSET_DIR: "assets",
  IMAGE_DIR: "images",
  AUDIO_DIR: "audio",
};
