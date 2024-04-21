import { CONSTANTS } from "@/constants";

export const peek = <T>(array: T[]): T => array[array.length - 1];

export const getAbsolutePath = (...paths: string[]) => paths.join("/");

export const getImgPath = (name: string) =>
  getAbsolutePath(CONSTANTS.IMAGE_DIR, name);

export const getSpritePath = (name: string) =>
  getAbsolutePath(CONSTANTS.SPRITE_DIR, name);

export const getAudioPath = (name: string | undefined) =>
  name === undefined ? undefined : getAbsolutePath(CONSTANTS.AUDIO_DIR, name);
