export class Button {
  constructor(
    private htmlElement: HTMLElement,
    private hideElement: (htmlElement: HTMLElement) => void,
    private showElement: (htmlElement: HTMLElement) => void
  ) {}

  get element(): HTMLElement {
    return this.htmlElement;
  }

  onClick(action: () => void): void {
    this.htmlElement.addEventListener('click', action);
  }

  hide(): void {
    this.hideElement(this.htmlElement);
  }

  show(): void {
    this.showElement(this.htmlElement);
  }
}
