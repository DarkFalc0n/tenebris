import { fadeCameraToScene } from "../utils/cameras.utils";
import { TenebrisScene } from "../classes/tenebrisScene";

export class Boot extends TenebrisScene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image("background", "assets/bg.png");
  }

  create() {
    this.add.image(512, 384, "background");
    this.input.once("pointerdown", () => {
      fadeCameraToScene(
        "TextScene",
        this.cameras.main,
        1000,
        {
          text: "Hello World",
          timeOut: 3000,
          nextScene: "Game",
        },
      );
    });
  }
}
