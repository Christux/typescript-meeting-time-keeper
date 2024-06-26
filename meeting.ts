import { MeetingComponent } from './components/meeting.component';
import {
  UploadSettingModal,
  UploadSettingModalInjection,
} from './components/upload-setting.modal';
import { MeetingSetting } from './core/meeting-setting';
import { ModalService } from './services/modal.service';
import { SettingService } from './services/settings.service';
import { TimedMeetingService } from './services/timed-meeting.service';
import { TranslateService } from './services/translate.service';

export class Meeting {
  private meetingComponent: MeetingComponent | null = null;
  private translateService: TranslateService;
  private modalService: ModalService;

  constructor() {
    this.translateService = new TranslateService();
    this.modalService = new ModalService(this.translateService);
  }

  bootstrap() {
    this.modalService.open<File, UploadSettingModalInjection>(
      UploadSettingModal,
      {
        returnCallback: (result) => {
          if (!result) {
            throw new Error('No file provided !');
          }
          this.buildSetting(result);
        },
      }
    );
  }

  buildApp(setting: MeetingSetting) {
    const settingService = new SettingService(setting);
    const meetingService = new TimedMeetingService(settingService);
    this.meetingComponent = new MeetingComponent(meetingService, this.translateService);
    this.meetingComponent.build();
    this.translateService.initThenTranslateToBrowserLanguage();

    setInterval(() => {
      if (this.meetingComponent) {
        meetingService.update();
        this.meetingComponent.update();
      }
    }, 500);
  }

  private buildSetting(setting: File) {
    const fr = new FileReader();
    fr.onload = () => {
      this.checkSetting(fr.result);
    };
    fr.readAsText(setting);
  }

  private checkSetting(fileReaderResult: string | ArrayBuffer | null) {
    const text = fileReaderResult;
    if (typeof text != 'string') {
      throw new Error('File parsing failed !');
    }

    this.buildApp(JSON.parse(text) as MeetingSetting);
  }
}
