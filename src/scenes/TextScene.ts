import { Scene } from "phaser";
import { TenebrisScene } from "../classes/tenebrisScene";
import { ISceneData } from "@/types";

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
    super("TextScene");
  }

  init(data: ITextSceneData) {
    this.text = data.text;
    // this.timeOut = data.timeOut;
    // this.nextScene = data.nextScene;

    this.add.text(400, 300, this.text, {
      fontSize: "32px",
      color: "#fff",
    });

    super.init({}) // Call the parent class's init method
  }
}
