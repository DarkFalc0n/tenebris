import { Input } from "phaser";
import { Action } from "@/types";

type ValidKeyTypes = string | number | Input.Keyboard.Key;

export class ControlManager<TKeys extends ValidKeyTypes> {
  private keyboard: Input.Keyboard.KeyboardPlugin;
  private locks: Map<TKeys, boolean>;
  private keys: Map<TKeys, Input.Keyboard.Key>;

  constructor(keyboard: Input.Keyboard.KeyboardPlugin) {
    this.locks = new Map();
    this.keys = new Map();
    this.keyboard = keyboard;
  }

  addKey(keyCode: TKeys) {
    const key = this.keyboard.addKey(keyCode);
    this.keys.set(keyCode, key);
    this.locks.set(keyCode, false);
  }

  onPress(keyCode: TKeys, callback: Action) {
    const key = this.keys.get(keyCode)!;

    key.on("down", () => {
      if (this.locks.get(keyCode)) return;
      this.locks.set(keyCode, true);
      callback();
    });
  }

  onRelease(keyCode: TKeys, callback: Action) {
    const key = this.keys.get(keyCode)!;

    key.on("up", () => {
      if (!this.locks.get(keyCode)) return;
      this.locks.set(keyCode, false);
      callback();
    });
  }
}
