import { TimedComponent } from '../core/components/timed-component';
import { beep, duck, fanfare } from '../core/sounds/sounds';
import { TimedSection } from '../core/timed-event/timed-section';

export class SectionComponent extends TimedComponent {
  private startButton: HTMLElement;
  private pauseButton: HTMLElement;
  private resumeButton: HTMLElement;
  private stopButton: HTMLElement;
  private restartButton: HTMLElement;

  constructor(parentElement: HTMLElement, private section: TimedSection) {
    super(parentElement, '#sectionTemplate', section);

    this.startButton = this.querySelector('.start');
    this.pauseButton = this.querySelector('.pause');
    this.resumeButton = this.querySelector('.resume');
    this.stopButton = this.querySelector('.stop');
    this.restartButton = this.querySelector('.restart');

    this.parentElement.appendChild(this.htmlElement);
  }

  protected buildComponent(): void {
    super.buildComponent();

    this.startButton.addEventListener('click', () => {
      this.section.start();
    });

    this.resumeButton.addEventListener('click', () => {
      this.section.resume();
    });

    this.pauseButton.addEventListener('click', () => {
      this.section.pause();
    });

    this.stopButton.addEventListener('click', () => {
      this.section.stop();
    });

    this.restartButton.addEventListener('click', () => {
      this.section.restart();
    });

    this.section.onStart(() => {
      this.hideElement(this.startButton);
      this.showElement(this.pauseButton);
      this.showElement(this.stopButton);
    });

    this.section.onPause(() => {
      this.hideElement(this.pauseButton);
      this.showElement(this.resumeButton);
    });

    this.section.onResume(() => {
      this.showElement(this.pauseButton);
      this.hideElement(this.resumeButton);
    });

    this.section.onStop(() => {
      this.hideElement(this.pauseButton);
      this.hideElement(this.resumeButton);
      this.hideElement(this.stopButton);
      this.showElement(this.restartButton);
    });

    this.section.onRestart(() => {
      this.hideElement(this.restartButton);
      this.showElement(this.pauseButton);
      this.showElement(this.stopButton);
    });

    this.section.onRatioReached(0.8, () => beep.play());
    this.section.onRatioReached(1, () => fanfare.play());
    this.section.onRatioReached(1.2, () => duck.play());
  }

  showStartButton(): void {
    this.showElement(this.startButton);
  }

  // hideAllButtons(): void {
  //   this.hideElement(this.startButton);
  //   this.hideElement(this.pauseButton);
  //   this.hideElement(this.resumeButton);
  //   this.hideElement(this.stopButton);
  //   this.hideElement(this.restartButton);
  // }
}
