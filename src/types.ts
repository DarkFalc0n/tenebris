import { Types } from "phaser";

export type TSpriteFile = {
  PATH: string;
  FRAME: Types.Loader.FileTypes.ImageFrameConfig;
};

export interface ISceneData {
  fadeTime?: number;
}

export type Action = (...params: never[]) => void;

export interface PlayerMethods {
  loadActions(): void;
  registerActions(): void;
  loadAnimations(): void;
  playAnimations(): void;
}
