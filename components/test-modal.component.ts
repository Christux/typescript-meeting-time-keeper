import { ModalComponent, ModalInjection } from '../services/modal.service';

export class TestModalComponent extends ModalComponent<
  string,
  TestModalInjection
> {
  protected htmlElement: DocumentFragment;
  private closeButton: HTMLElement;

  constructor(modalInjection: TestModalInjection) {
    super(modalInjection);

    const template = this.documentQuerySelector(
      '#test-modal'
    ) as HTMLTemplateElement;

    this.htmlElement = document.importNode(template.content, true);
    this.closeButton = this.querySelector('.close');
  }

  protected buildComponent(): void {
    this.closeButton.addEventListener('click', () => {
      this.modalInjection.returnCallback(this.modalInjection.message);
    });
  }
  protected updateComponent(): void {
    throw new Error('Method not implemented.');
  }
}

export interface TestModalInjection extends ModalInjection<string> {
  message: string;
}
