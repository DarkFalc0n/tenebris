import { Action } from "@/types";

export class ActionsManager<ActionKey extends number> {
  private default: ActionKey | null; // default action
  private actions: Map<ActionKey, Action>; // list of all available actions
  private priority: Map<ActionKey, number>; // priority of each action
  private stack: ActionKey[]; // stores keys of sequentially executed actions

  constructor(defaultAction?: ActionKey) {
    this.actions = new Map<ActionKey, Action>();
    this.priority = new Map<ActionKey, number>();
    this.stack = [];
    this.default = null;
    if (defaultAction !== undefined) {
      this.stack.push(defaultAction);
      this.default = defaultAction;
    }
  }

  private insert(key: ActionKey) {
    const index = this.stack.indexOf(key);
    if (index !== -1) {
      // if action already exists
      if (
        index === this.stack.length - 1 ||
        this.priority.get(key)! <
          this.priority.get(this.stack[index + 1])!
      )
        return; // and already at the top position for its priority, do nothing
      this.stack.splice(index, 1); // else, remove the action first
    }

    this.stack.push(key); // add the action to the stack
    // sort the stack based on priority
    for (let i = this.stack.length - 1; i > 0; i--) {
      // slowly get to your seat newbie
      if (
        this.priority.get(this.stack[i])! <
        this.priority.get(this.stack[i - 1])!
      ) {
        // swapping (couldn't find an inbuilt function )
        const temp = this.stack[i];
        this.stack[i] = this.stack[i - 1];
        this.stack[i - 1] = temp;
      } else break;
    }
  }
  /**
   * @description add an action to the manager
   * @param key identifier for the action
   * @param action the logic for this action
   * @param priority a number that determines the order of execution
   */
  add(key: ActionKey, action: Action, priority: number) {
    this.actions.set(key, action);
    this.priority.set(key, priority);
  }

  /**
   * @description trigger the action
   * @param key identifier for the action
   */
  start(key: ActionKey) {
    const isRepeating =
      key === this.stack[this.stack.length - 1];
    this.insert(key); // add to the stack

    if (!isRepeating) this.actions.get(key)!();
  }

  /**
   * @description stop the action
   * @param key identifier for the action
   */
  end(key: ActionKey) {
    // remove the action from the stack
    this.stack = this.stack.filter((k) => k !== key);
    if (this.stack.length === 0) {
      if (this.default !== null)
        this.stack.push(this.default); // if no action is left, start the default action
      else return; // if no default action is set, do nothing
    }

    // invoke the most recent action
    const prev = this.stack[this.stack.length - 1];
    this.actions.get(prev)!();
  }
}
