import { Button } from '../core/components/button';
import { Component } from '../core/components/component';
import { TProgressValueRenderer } from '../core/value-renderer/progress-value-renderer';
import { StringValueRenderer } from '../core/value-renderer/string-value-renderer';
import { TimeValueRenderer } from '../core/value-renderer/time-value-renderer';
import { TimedMeetingService } from '../services/timed-meeting.service';

export class HeaderComponent extends Component {
  protected htmlElement: HTMLElement;

  private meetingTitle: StringValueRenderer;
  private meetingElapsedTime: TimeValueRenderer;
  private meetingDuration: TimeValueRenderer;
  private meetingRemainingTime: TimeValueRenderer;
  private sectionRemainingTime: TimeValueRenderer;
  private meetingElapsedTimeProgress: TProgressValueRenderer;
  private meetingRemainingTimeProgress: TProgressValueRenderer;
  private startMeetingButton: Button;
  //private stopMeetingButton: Button;
  private downloadMeetingButton: Button;

  constructor(private meetingService: TimedMeetingService) {
    super();

    this.htmlElement = this.documentQuerySelector('#header');

    this.meetingElapsedTime = new TimeValueRenderer(
      this.querySelector('#meetingElapsedTime')
    );
    this.meetingDuration = new TimeValueRenderer(
      this.querySelector('#meetingDuration')
    );
    this.meetingRemainingTime = new TimeValueRenderer(
      this.querySelector('#meetingRemainingTime')
    );
    this.sectionRemainingTime = new TimeValueRenderer(
      this.querySelector('#sectionRemainingTime')
    );
    this.meetingTitle = new StringValueRenderer(
      this.querySelector('#meetingTitle')
    );

    this.meetingElapsedTimeProgress = new TProgressValueRenderer(
      this.querySelector('#meetingElapsedTimeProgress')
    );

    this.meetingRemainingTimeProgress = new TProgressValueRenderer(
      this.querySelector('#meetingRemainingTimeProgress')
    );

    this.startMeetingButton = this.createButton('#startMeeting');
    //this.stopMeetingButton = this.createButton('#stopMeeting');
    this.downloadMeetingButton = this.createButton('#downloadMeeting');
  }

  protected buildComponent(): void {
    this.meetingTitle.render(this.meetingService.title);
    this.startMeetingButton.onClick(() => {
      this.meetingService.start();
    });
    // this.stopMeetingButton.onClick(() => {
    //   this.meetingService.stop();
    // });

    this.downloadMeetingButton.onClick(() => {
      this.meetingService.downloadMeeting();
    });

    this.meetingService.onStart(() => {
      this.startMeetingButton.hide();
      //this.stopMeetingButton.show();
      this.downloadMeetingButton.show();
    });

    // this.meetingService.onStop(() => {
    //   this.stopMeetingButton.hide();
    //   this.downloadMeetingButton.show();
    // });
  }

  protected updateComponent(): void {
    this.meetingElapsedTime.render(this.meetingService.getElapsedTime());
    this.meetingDuration.render(this.meetingService.getDuration());
    this.meetingRemainingTime.render(this.meetingService.getRemaingTime());
    this.sectionRemainingTime.render(this.meetingService.sectionRemaingTime);

    this.meetingElapsedTimeProgress.render(
      this.meetingService.getElapsedTime() / this.meetingService.getDuration()
    );

    this.meetingRemainingTimeProgress.render(
      this.meetingService.sectionRemaingTime / this.meetingService.getDuration()
    );
  }
}
