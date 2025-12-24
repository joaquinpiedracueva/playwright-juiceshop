import type { Locator, Page } from '../fixtures';

export class TextInputPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/textinput',
    private inputField: Locator = page.locator('#newButtonName'),
    private updatingButton: Locator = page.locator('#updatingButton'),
  ) {}
}
