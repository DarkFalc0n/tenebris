export const fadeCameraToScene = (
  nextScene: Phaser.Scene | string,
  camera: Phaser.Cameras.Scene2D.Camera,
  duration: number = 1000,
  nextSceneData?: Object,
) => {
  camera.fadeOut(
    duration / 2,
    0,
    0,
    0,
    (_: any, progress: number) => {
      if (progress === 1) {
        camera.scene.scene.start(nextScene, nextSceneData);
      }
    },
  );
};
