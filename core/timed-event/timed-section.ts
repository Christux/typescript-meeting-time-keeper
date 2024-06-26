import { LinkedTimedEvent } from './linked-time-event';
import { TimedEvent } from './timed-event';
import { TimedMonitor } from './timed-monitor';

export class TimedSection extends LinkedTimedEvent implements TimedMonitor {
  constructor(
    private _title: string,
    duration: number,
    previousEvent: TimedEvent | null = null
  ) {
    super(duration, previousEvent);
  }

  get title(): string {
    return this._title;
  }
}
