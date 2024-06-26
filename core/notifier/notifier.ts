export class Notifier {
  private actions: { [key: string]: ((obj: any) => void)[] } = {};

  protected register(key: string, action: (obj: any) => void): void {
    if (typeof action !== 'function') {
      throw new Error('Action is not a function !!');
    }

    if (!this.actions.hasOwnProperty(key)) {
      this.actions[key] = [];
    }

    this.actions[key].push(action);
  }

  protected notifyAll(key: string, obj: any): void {
    if (this.actions.hasOwnProperty(key)) {
      this.actions[key].forEach((action) => action(obj));
    }
  }
}
