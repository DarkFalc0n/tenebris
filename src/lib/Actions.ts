import { Action } from "@/types";

export class ActionsManager {
  private defaultAction: string;
  private actions: Map<string, Action>; // list of all available actions
  private stack: string[]; // stores keys of sequentially executed actions

  constructor(defaultAction: string) {
    this.actions = new Map<string, Action>();
    this.defaultAction = defaultAction;
    this.stack = [defaultAction];
  }

  add(name: string, action: Action) {
    this.actions.set(name, action);
  }

  start(name: string) {
    // invoke the action first
    this.actions.get(name)!();

    // bring it to the top of the stack
    const updated = this.stack.filter((s) => s !== name);
    updated.push(name);
    this.stack = updated;
  }

  end(name: string) {
    // remove the action from the stack
    this.stack = this.stack.filter((s) => s !== name);
    if (this.stack.length === 0) {
      this.stack.push(this.defaultAction);
    }

    // invoke the most recent action
    const prev = this.stack[this.stack.length - 1];
    this.actions.get(prev)!();
  }
}
