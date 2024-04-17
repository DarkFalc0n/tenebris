import { Input } from "phaser";

export interface ISceneData {
  fadeTime?: number;
}

export type Control = Record<string, Input.Keyboard.Key>;
