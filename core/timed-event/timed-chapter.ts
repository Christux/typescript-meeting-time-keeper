import { TimedMonitor } from './timed-monitor';
import { TimedSection } from './timed-section';

export class TimedChapter implements TimedMonitor {
  constructor(private _title: string, protected _sections: TimedSection[]) {}

  get title(): string {
    return this._title;
  }

  get sections(): TimedSection[] {
    return this._sections;
  }

  getElapsedTime(): number {
    return this._sections.reduce(
      (sum, current) => sum + current.getElapsedTime(),
      0
    );
  }

  getDuration(): number {
    return this._sections.reduce(
      (sum, current) => sum + current.getDuration(),
      0
    );
  }

  getRemaingTime(): number {
    return this._sections.reduce(
      (sum, current) => sum + current.getRemaingTime(),
      0
    );
  }
}
