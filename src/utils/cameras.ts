export const fadeCameraToScene = (
  nextScene: Phaser.Scene | string,
  camera: Phaser.Cameras.Scene2D.Camera,
  duration: number = 1000,
  nextSceneData?: object,
) => {
  camera.fadeOut(duration / 2, 0, 0, 0, (_: unknown, progress: number) => {
    if (progress === 1) {
      if (camera.scene.scene.key !== nextScene)
        camera.scene.scene.start(nextScene, nextSceneData);
      else camera.scene.scene.restart(nextSceneData);
    }
  });
};
