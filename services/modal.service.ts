import { Component } from '../core/components/component';
import { TranslateService } from './translate.service';

export class ModalService {
  private modalComponent: InternalModalComponent;

  constructor(translateService: TranslateService) {
    this.modalComponent = new InternalModalComponent(translateService);
    this.modalComponent.build();
  }

  open<U, V extends ModalInjection<U>>(
    modalComponent: new (modalInjection: V) => ModalComponent<U, V>,
    modalInjection: V
  ): void {
    const returnCallback = modalInjection.returnCallback;

    modalInjection.returnCallback = (result: U | null) => {
      returnCallback(result);
      this.close();
    };

    this.modalComponent.open(
      new modalComponent(modalInjection),
      returnCallback
    );
  }

  close(): void {
    this.modalComponent.close();
  }

  protected documentQuerySelector<T extends Element = HTMLElement>(
    selectors: string
  ): T {
    const element = document.querySelector<T>(selectors);

    if (!element) {
      throw new Error(`Element ${selectors} was not found !`);
    }

    return element;
  }
}

export interface ModalInjection<T> {
  returnCallback: (result: T | null) => void;
  enableClose?: boolean;
}

export abstract class ModalComponent<
  T,
  V extends ModalInjection<T>
> extends Component {
  constructor(protected modalInjection: V) {
    super();
  }

  getElement(): HTMLElement | DocumentFragment {
    return this.htmlElement;
  }
}

class InternalModalComponent extends Component {
  protected htmlElement: HTMLElement;
  private contentElement: HTMLElement;
  private enableClose = false;
  private returnNullCallback: ((result: null) => void) | null = null;

  constructor(private translateService: TranslateService) {
    super();
    this.htmlElement = this.documentQuerySelector('.modal');
    this.contentElement = this.querySelector('.modal-content');
  }

  protected buildComponent(): void {
    this.htmlElement.addEventListener('click', () => {
      if (this.enableClose) {
        if (this.returnNullCallback) {
          this.returnNullCallback(null);
        }
        this.close();
      }
    });
    this.contentElement.addEventListener('click', (ev) => {
      ev.stopImmediatePropagation();
    });
  }

  protected updateComponent(): void {}

  open<T, V extends ModalInjection<T>>(
    modalComponent: ModalComponent<T, V>,
    returnNullCallback: (result: null) => void
  ): void {
    this.returnNullCallback = returnNullCallback;
    this.contentElement.appendChild(modalComponent.getElement());
    modalComponent.build();
    this.translateService.translateAllElements(this.htmlElement);
    this.showElement(this.htmlElement);
  }

  close(): void {
    if (this.returnNullCallback) {
      this.returnNullCallback = null;
    }
    this.hideElement(this.htmlElement);
    this.contentElement.innerHTML = '';
  }
}
