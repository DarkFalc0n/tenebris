import { AUTO, Game, Scale, Types } from "phaser";

import { Boot } from "./scenes/Boot";
import { TextScene } from "./scenes/TextScene";
import { CONSTANTS } from "./constants";

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  render: {
    pixelArt: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: CONSTANTS.CONFIG.GRAVITY,
      debug: ENVIRONMENT === "development",
    },
  },
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [Boot, TextScene],
};

export default new Game(config);
