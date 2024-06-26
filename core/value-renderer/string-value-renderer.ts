import { ValueRenderer } from "./value-renderer";

export class StringValueRenderer extends ValueRenderer<string> {

  constructor(element: HTMLElement) {
    super(element);
  }

  protected override stringify(value: string): string {
    return value;
  }
}