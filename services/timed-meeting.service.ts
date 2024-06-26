import { MeetingSetting } from '../core/meeting-setting';
import { TimedChapter } from '../core/timed-event/timed-chapter';
import { TimedEvent } from '../core/timed-event/timed-event';
import { TimedSection } from '../core/timed-event/timed-section';
import { download, timeToString } from '../core/utils';
import { SettingService } from './settings.service';

export class TimedMeetingService extends TimedEvent {
  protected meetingTitle: string;
  protected meetingDate: Date;
  protected sections: TimedSection[] = [];
  protected _chapters: TimedChapter[] = [];

  constructor(settingService: SettingService) {
    super(settingService.duration * 60);

    this.meetingTitle = settingService.title;
    this.meetingDate = new Date(Date.now());

    settingService.chapters.forEach((chapterSetting) => {
      const chapterSections: TimedSection[] = [];

      this._chapters.push(
        new TimedChapter(chapterSetting.title, chapterSections)
      );

      chapterSetting.sections.forEach((sectionSetting) => {
        chapterSections.push(
          this.addSection(sectionSetting.title, sectionSetting.duration)
        );
      });
    });
  }

  override update(): void {
    super.update();
    this.sections.forEach((t) => t.update());
  }

  override stop(): void {
    this.sections.forEach((section) => {
      if (!section.isStopped()) {
        section.stop();
      }
    });
    super.stop();
  }

  get sectionRemaingTime(): number {
    return this.sections.reduce(
      (sum, current) => sum + current.getRemaingTime(),
      0
    );
  }

  get title(): string {
    return this.meetingTitle;
  }

  get chapters(): TimedChapter[] {
    return this._chapters;
  }

  private addSection(title: string, duration: number): TimedSection {
    const idx = this.sections.length;

    const section = new TimedSection(
      title,
      duration * 60,
      idx > 0 ? this.sections[idx - 1] : null
    );

    this.sections.push(section);

    return section;
  }

  private getMeetingSetting(): MeetingSetting {
    return {
      title: this.meetingTitle,
      duration: this.getDuration() / 60,
      _durationString: timeToString(this.getDuration()),
      elapsedTime: this.getElapsedTime() / 60,
      _elapsedTimeString: timeToString(this.getElapsedTime()),
      chapters: this.chapters.map((chapter) => ({
        title: chapter.title,
        sections: chapter.sections.map((section) => ({
          title: section.title,
          speaker: undefined,
          duration: section.getDuration() / 60,
          _durationString: timeToString(section.getDuration()),
          elapsedTime: section.getElapsedTime() / 60,
          _elapsedTimeString: timeToString(section.getElapsedTime()),
        })),
      })),
      date: this.meetingDate.toISOString(),
    };
  }

  downloadMeeting(): void {
    download('meeting.json', this.getMeetingSetting());
  }
}
