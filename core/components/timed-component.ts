import { TimedMonitor } from '../timed-event/timed-monitor';
import { TProgressValueRenderer } from '../value-renderer/progress-value-renderer';
import { StringValueRenderer } from '../value-renderer/string-value-renderer';
import { TimeValueRenderer } from '../value-renderer/time-value-renderer';
import { Component } from './component';

export abstract class TimedComponent extends Component {
  protected htmlElement: HTMLElement | DocumentFragment;
  private title: StringValueRenderer;
  private elapsedTime: TimeValueRenderer;
  private durationTime: TimeValueRenderer;
  private remainingTime: TimeValueRenderer;
  private remainingTimeProgress: TProgressValueRenderer;

  constructor(
    protected parentElement: HTMLElement,
    templateSelector: string,
    private monitor: TimedMonitor
  ) {
    super();

    const template = this.documentQuerySelector(
      templateSelector
    ) as HTMLTemplateElement;

    this.htmlElement = document.importNode(template.content, true);

    this.title = new StringValueRenderer(this.querySelector('.title'));

    this.elapsedTime = new TimeValueRenderer(
      this.querySelector('.elapsedTime')
    );
    this.durationTime = new TimeValueRenderer(
      this.querySelector('.durationTime')
    );
    this.remainingTime = new TimeValueRenderer(
      this.querySelector('.remainingTime')
    );
    this.remainingTimeProgress = new TProgressValueRenderer(
      this.querySelector('.remainingTimeProgress')
    );
  }

  protected buildComponent(): void {
    this.title.render(this.monitor.title);
  }

  protected updateComponent(): void {
    this.elapsedTime.render(this.monitor.getElapsedTime());
    this.durationTime.render(this.monitor.getDuration());
    this.remainingTime.render(this.monitor.getRemaingTime());
    this.remainingTimeProgress.render(
      this.monitor.getRemaingTime() / this.monitor.getDuration()
    );
  }
}
