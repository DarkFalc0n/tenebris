import { Action } from "@/types";
import { peek } from "@/utils";

interface IThread<Key> {
  isBlocking: boolean;
  default?: Key;
}

export class ActionsManager<ActionKey extends number> {
  private actions: Map<ActionKey, Action>;
  private mtStack: ActionKey[][];
  private location: Map<ActionKey, number>;
  private threads: IThread<ActionKey>[];

  /**
   *
   * @param threads different threads you want your actions to run
   */
  constructor(threads: number) {
    this.actions = new Map<ActionKey, Action>();
    this.mtStack = new Array<ActionKey[]>(threads).fill([]);
    this.location = new Map<ActionKey, number>();
    this.threads = new Array<IThread<ActionKey>>(threads);
  }

  /**
   *
   * @description make a thread blocking, a.k.a one action can be inserted at a time
   * @param threadID ID of the thread to block
   */
  blockThread(threadID: number) {
    this.threads[threadID] = {
      ...this.threads[threadID],
      isBlocking: true,
    };
  }

  /**
   * @description add an action to the manager
   * @param key identifier for the action
   * @param action the logic for this action
   * @param thread the thread ID this action should be running on
   * @param setDefault set this action as the default action for the thread
   */
  add(
    key: ActionKey,
    action: Action,
    thread: number,
    setDefault = false,
  ) {
    this.actions.set(key, action);
    if (setDefault)
      this.threads[thread] = {
        ...this.threads[thread],
        default: key,
      };
    else this.location.set(key, thread);
  }

  /**
   * @description trigger the action
   * @param key identifier for the action
   */
  start(key: ActionKey) {
    const thread = this.location.get(key)!;
    const wasRunning =
      this.mtStack[thread].length !== 0 &&
      key === peek(this.mtStack[thread]);

    if (wasRunning) return;
    if (this.threads[thread]?.isBlocking === true) {
      if (this.mtStack[thread].length === 0) {
        this.mtStack[thread].push(key);
        this.actions.get(key)!();
      }
      return;
    }

    this.actions.get(key)!();
    this.mtStack[thread] = this.mtStack[thread].filter(
      (k) => k !== key,
    );
    this.mtStack[thread].push(key);
  }

  /**
   * @description stop the action
   * @param key identifier for the action
   */
  end(key: ActionKey) {
    const thread = this.location.get(key)!;
    const wasRunning =
      this.mtStack[thread].length !== 0 &&
      key === peek(this.mtStack[thread]);

    // remove the action from stack
    this.mtStack[thread] = this.mtStack[thread].filter(
      (k) => k !== key,
    );

    // start the next action if active action was removed
    if (!wasRunning) return;
    if (this.mtStack[thread].length === 0) {
      if (this.threads[thread]?.default !== undefined)
        this.actions.get(this.threads[thread].default!)!();
      return;
    }
    const recent = peek(this.mtStack[thread]);
    this.actions.get(recent)!();
  }
}
