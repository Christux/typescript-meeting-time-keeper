import { Button } from '../core/components/button';
import { Component } from '../core/components/component';
import { TranslateService } from '../services/translate.service';

export class FooterComponent extends Component {
  protected htmlElement: HTMLElement;
  private frButton: Button;
  private enButton: Button;

  constructor(private translateService: TranslateService) {
    super();
    this.htmlElement = this.documentQuerySelector('#footer');
    this.frButton = this.createButton('.fr');
    this.enButton = this.createButton('.en');
  }

  protected buildComponent(): void {
    this.frButton.onClick(() => {
      this.translateService.setLangages('fr');
      this.translateService.translateAllElements(document);
      this.frButton.hide();
      this.enButton.show();
    });

    this.enButton.onClick(() => {
      this.translateService.setLangages('en');
      this.translateService.translateAllElements(document);
      this.frButton.show();
      this.enButton.hide();
    });

    if (this.getFirstLanguage(['fr', 'en']) === 'fr') {
      this.enButton.show();
    } else {
      this.frButton.show();
    }
  }

  protected updateComponent(): void {}

  private getFirstLanguage(languages: string[]): string {
    const l = this.translateService.languages.filter((language) =>
      languages.find((lang) => lang === language)
    );

    if (l.length > 0) {
      return l[0];
    }

    return 'en';
  }
}
