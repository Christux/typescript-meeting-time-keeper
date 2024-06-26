import { ModalComponent, ModalInjection } from '../services/modal.service';

export class UploadSettingModal extends ModalComponent<
  File,
  UploadSettingModalInjection
> {
  protected htmlElement: HTMLElement | DocumentFragment;
  private fileFormElement: HTMLFormElement;

  constructor(modalInjection: UploadSettingModalInjection) {
    super(modalInjection);

    const template = this.documentQuerySelector(
      '#upload-setting-modal'
    ) as HTMLTemplateElement;

    this.htmlElement = document.importNode(template.content, true);
    this.fileFormElement = this.querySelector('#settingFile');
  }

  protected buildComponent(): void {
    this.fileFormElement.addEventListener('change', () => {
      this.modalInjection.returnCallback(this.fileFormElement.files[0]);
    });
  }

  protected updateComponent(): void {
    throw new Error('Method not implemented.');
  }
}

export interface UploadSettingModalInjection extends ModalInjection<File> {}
