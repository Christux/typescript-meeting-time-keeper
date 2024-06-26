import { TranslateService } from './translate.service';

export class NotoficationService {
  constructor(private translateService: TranslateService) {}

  private open(message: NotificationMessage): void {}

  success(): void {
    this.open({
      fr: 'coucou',
      default: 'hello'
    });
  }
}

interface NotificationMessage extends Record<string, string> {
  default: string;
}
