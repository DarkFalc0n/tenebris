import type { Sound, Types } from "phaser";

export type ValueOf<T> = T[keyof T];

export type SFX =
  | Sound.NoAudioSound
  | Sound.HTML5AudioSound
  | Sound.WebAudioSound;

export interface ISceneData {
  fadeTime?: number;
  showFps?: boolean;
}

export type TSpriteFile = {
  name: string;
  path: string;
  frame: Types.Loader.FileTypes.ImageFrameConfig;
};

export type TAudioSpriteFile = {
  name: string;
  json: string;
  src: string;
};

export type Action = (...params: never[]) => void;

export interface PlayerMethods {
  loadActions(): void;
  registerActions(): void;
  loadAnimations(): void;
  playAnimations(): void;
}
