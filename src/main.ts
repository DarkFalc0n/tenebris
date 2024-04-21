import { Game, Types } from "phaser";

import { Boot } from "./scenes/Boot";
import { TextScene } from "./scenes/TextScene";
import { CONSTANTS } from "./constants";

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  render: {
    pixelArt: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: CONSTANTS.CONFIG.GRAVITY },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, TextScene],
};

export default new Game(config);
