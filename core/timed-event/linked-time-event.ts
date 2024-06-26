import { TimedEvent } from './timed-event';

export class LinkedTimedEvent extends TimedEvent {
  constructor(
    duration: number,
    private previousEvent: TimedEvent | null = null
  ) {
    super(duration);
  }

  start() {
    super.start();
    if (this.previousEvent) {
      this.previousEvent.stop();
    }
  }
}
