import { timeToString } from '../utils';
import { ValueRenderer } from './value-renderer';

export class TimeValueRenderer extends ValueRenderer<number> {
  constructor(element: HTMLElement) {
    super(element);
  }

  protected override stringify(time: number): string {
    return timeToString(time);
  }
}
