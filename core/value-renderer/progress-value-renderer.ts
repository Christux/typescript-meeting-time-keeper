import { ValueRenderer } from './value-renderer';

export class TProgressValueRenderer extends ValueRenderer<number> {
  constructor(element: HTMLElement) {
    super(element);
  }

  protected override stringify(value: number): string {
    throw new Error('Not implemented');
  }

  protected override updateDOM(value: number): void {
    (this.element as HTMLProgressElement).value = value;
  }
}
