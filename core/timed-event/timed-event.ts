import { Notifier } from '../notifier/notifier';

export class TimedEvent extends Notifier {
  private elapsedTime = 0;
  private lastTime = 0;
  private started = false;
  private paused = false;
  private stopped = false;
  private timeReached: { [key: number]: boolean } = {};

  constructor(private duration: number) {
    super();
  }

  getElapsedTime() {
    return this.elapsedTime;
  }

  getRemaingTime() {
    if (this.stopped || this.elapsedTime > this.duration) {
      return 0;
    }

    return this.duration - this.elapsedTime;
  }

  getDuration() {
    return this.duration;
  }

  getTime() {
    return Date.now() / 1000;
  }

  isStarted() {
    return this.started;
  }

  isStopped() {
    return this.stopped;
  }

  update() {
    if (this.started && !this.paused && !this.stopped) {
      const currentTime = this.getTime();
      this.elapsedTime = this.elapsedTime + (currentTime - this.lastTime);
      this.lastTime = currentTime;

      for (const time in this.timeReached) {
        if (!this.timeReached[time]) {
          if (this.elapsedTime >= time) {
            this.timeReached[time] = true;
            this.notifyAll(`time-${time}`, null);
          }
        }
      }
    }
  }

  start() {
    if (!this.started && !this.stopped) {
      this.started = true;
      this.lastTime = this.getTime();
      this.notifyAll('start', null);
    }
  }

  pause() {
    if (!this.paused) {
      this.paused = true;
      this.notifyAll('pause', null);
    }
  }

  resume() {
    if (this.paused) {
      this.paused = false;
      this.lastTime = this.getTime();
      this.notifyAll('resume', null);
    }
  }

  stop() {
    if (this.started && !this.stopped) {
      this.stopped = true;
      this.paused = false;
      this.notifyAll('stop', null);
    }
  }

  restart() {
    if (this.started && this.stopped) {
      this.stopped = false;
      this.lastTime = this.getTime();
      this.notifyAll('restart', null);
    }
  }

  onStart(action: () => void): void {
    this.register('start', action);
  }

  onPause(action: () => void): void {
    this.register('pause', action);
  }

  onResume(action: () => void): void {
    this.register('resume', action);
  }

  onStop(action: () => void): void {
    this.register('stop', action);
  }

  onRestart(action: () => void): void {
    this.register('restart', action);
  }

  onTimeReached(time: number, action: () => void): void {
    if (!this.timeReached.hasOwnProperty(time)) {
      this.timeReached[time] = false;
    }
    this.register(`time-${time}`, action);
  }

  onRatioReached(ratio: number, action: () => void): void {
    this.onTimeReached(this.duration * ratio, action);
  }
}
