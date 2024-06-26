export abstract class ValueRenderer<T> {
  private currentValue: T | null = null;

  constructor(protected element: HTMLElement) {}

  render(newValue: T): void {
    if (this.currentValue !== newValue) {
      this.currentValue = newValue;
      this.updateDOM(newValue);
    }
  }

  protected updateDOM(value: T): void {
    this.element.innerText = this.stringify(value);
  }

  protected abstract stringify(val: T): string;
}
