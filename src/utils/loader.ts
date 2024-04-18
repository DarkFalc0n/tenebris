import type { TenebrisScene } from "@/classes/tenebrisScene";
import { CONSTANTS } from "@/constants";

const getAbsolutePath = (...paths: string[]) =>
  paths.join("/");

export const loadImages = (scene: TenebrisScene) => {
  for (const [name, path] of Object.entries(
    CONSTANTS.IMAGES,
  )) {
    scene.load.image(
      name,
      getAbsolutePath(CONSTANTS.IMAGE_DIR, path),
    );
  }
};

export const loadSprites = (scene: TenebrisScene) => {
  for (const [name, sprite] of Object.entries(
    CONSTANTS.SPRITES,
  )) {
    scene.load.spritesheet(
      name,
      getAbsolutePath(CONSTANTS.SPRITE_DIR, sprite.PATH),
      sprite.FRAME,
    );
  }
};
