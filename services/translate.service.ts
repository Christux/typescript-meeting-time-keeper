export class TranslateService {
  private readonly defaultLanguage = 'en';
  private readonly browserLanguages: string[];
  private userLanguages: string[] | null = null;

  constructor() {
    this.browserLanguages = [...window.navigator.languages];
  }

  initThenTranslateToBrowserLanguage(): void {
    this.translateAllElements(document, this.browserLanguages);
  }

  translateAllElements(
    root: HTMLElement | Document,
    languages: string[] = this.languages
  ): void {
    this.getTranslateElements(root).forEach((element) => {
      this.translateElement(element, languages);
    });
  }

  setLangages(languages: string | string[]): void {
    if (Array.isArray(languages)) {
      this.userLanguages = languages;
    } else {
      this.userLanguages = [languages];
    }
  }

  get languages(): string[] {
    return [...(this.userLanguages ?? this.browserLanguages)];
  }

  private getTranslateElements(root: HTMLElement | Document): HTMLElement[] {
    return Array.from(
      root.getElementsByTagName(
        'app-translate'
      ) as HTMLCollectionOf<HTMLElement>
    );
  }

  private translateElement(element: HTMLElement, languages: string[]): void {
    for (let i = 0, l = languages.length; i < l; i++) {
      const langage = languages[i];
      if (element.hasAttribute(langage)) {
        // backup default message
        if (!element.hasAttribute(this.defaultLanguage)) {
          element.setAttribute(this.defaultLanguage, element.innerText);
        }
        element.innerText = element.getAttribute(langage) ?? '';
        break;
      }
    }
  }
}
