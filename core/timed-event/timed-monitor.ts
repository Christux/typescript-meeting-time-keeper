export interface TimedMonitor {
  title: string;
  getElapsedTime(): number;
  getRemaingTime(): number;
  getDuration(): number;
}
