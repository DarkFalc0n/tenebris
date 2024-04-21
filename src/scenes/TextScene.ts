import { Scene } from "phaser";
import { TenebrisScene } from "@/classes/TenebrisScene";
import { ISceneData } from "@/types";
import { CONSTANTS } from "@/constants";

interface ITextSceneData extends ISceneData {
  text: string;
  timeOut: number;
  nextScene?: string | Scene;
}

export class TextScene extends TenebrisScene {
  private text: string;
  //   private timeOut: number;
  //   private nextScene?: string | Scene;

  constructor() {
    super(CONSTANTS.SCENES.TEXT_SCENE);
  }

  init(data: ITextSceneData) {
    this.text = data.text;
    // this.timeOut = data.timeOut;
    // this.nextScene = data.nextScene;

    this.add.text(400, 300, this.text, {
      fontSize: "32px",
      color: "#fff",
    });

    super.init();
  }
}
