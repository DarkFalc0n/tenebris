export interface ISceneData {
  fadeTime?: number;
}

export interface PlayerMethods {
  loadActions(): void;
  registerActions(): void;
  loadAnimations(): void;
  playAnimations(): void;
}
