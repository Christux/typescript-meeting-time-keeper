import { Chapter, MeetingSetting } from '../core/meeting-setting';
import { Notifier } from '../core/notifier/notifier';

export class SettingService extends Notifier {
  
  constructor(private currentSetting: MeetingSetting) {
    super();
    this.checkSettings(this.currentSetting);
  }

  get setting(): MeetingSetting {
    return this.currentSetting;
  }

  get title(): string {
    return this.currentSetting.title;
  }

  get duration(): number {
    return this.currentSetting.duration;
  }

  get chapters(): Chapter[] {
    return this.currentSetting.chapters;
  }

  private checkSettings(json: MeetingSetting): void {
    
    ['title', 'duration', 'chapters'].forEach((ppt) => {
      if (!json.hasOwnProperty(ppt)) {
        throw new Error(`Missing ${ppt} property`);
      }
    });

    if (!Array.isArray(json.chapters)) {
      throw new Error(`Chapters property is not an array`);
    }

    json.chapters.forEach((chapter) => {
      ['title', 'sections'].forEach((ppt) => {
        if (!chapter.hasOwnProperty(ppt)) {
          throw new Error(`Missing ${ppt} property`);
        }
      });

      if (!Array.isArray(chapter.sections)) {
        throw new Error(`Sections property is not an array`);
      }

      chapter.sections.forEach((section) => {
        ['title', 'duration'].forEach((ppt) => {
          if (!json.hasOwnProperty(ppt)) {
            throw new Error(`Missing ${ppt} property`);
          }
        });
      });
    });
  }
}
