import { TimedComponent } from '../core/components/timed-component';
import { TimedChapter } from '../core/timed-event/timed-chapter';

export class ChapterComponent extends TimedComponent {
  constructor(parentElement: HTMLElement, chapter: TimedChapter) {
    super(parentElement, '#chapterTemplate', chapter);
    this.parentElement.appendChild(this.htmlElement);
  }
}
