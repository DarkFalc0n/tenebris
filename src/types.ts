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
  path: string;
  frame: Types.Loader.FileTypes.ImageFrameConfig;
};

export type TAudioFile = {
  json: string;
  src: string;
};

export type ImageConfig = Record<string, string>;
export type SpriteConfig = Record<string, TSpriteFile>;
export type AudioConfig = Record<string, TAudioFile>;

export type Action = (...params: never[]) => void;

export interface PlayerMethods {
  loadActions(): void;
  registerActions(): void;
  loadAnimations(): void;
  playAnimations(): void;
}
