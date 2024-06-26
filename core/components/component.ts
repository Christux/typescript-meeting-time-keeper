import { Button } from './button';

export abstract class Component {
  protected abstract htmlElement: HTMLElement | DocumentFragment;
  private childrens: Component[] = [];

  protected abstract buildComponent(): void;
  protected abstract updateComponent(): void;

  build(): void {
    this.buildComponent();
    this.childrens.forEach((component) => component.build());
  }

  update(): void {
    this.updateComponent();
    this.childrens.forEach((component) => component.update());
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

  protected querySelector<T extends Element = HTMLElement>(
    selectors: string
  ): T {
    const element = this.htmlElement.querySelector<T>(selectors);

    if (!element) {
      throw new Error(`Element ${selectors} was not found !`);
    }

    return element;
  }

  protected addChildComponent(component: Component): void {
    this.childrens.push(component);
  }

  protected loopOnChildComponents(
    action: (component: Component) => void
  ): void {
    this.childrens.forEach((component) => {
      action(component);
    });
  }

  protected hideElement(element: HTMLElement): void {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
    }
  }

  protected showElement(element: HTMLElement): void {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    }
  }

  protected createButton(selector: string): Button {
    return new Button(
      this.querySelector(selector),
      (element: HTMLElement) => this.hideElement(element),
      (element: HTMLElement) => this.showElement(element)
    );
  }
}
