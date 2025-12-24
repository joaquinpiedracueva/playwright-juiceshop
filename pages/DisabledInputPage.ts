import type { Locator, Page } from '../fixtures';

export class DisabledInputPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/disabledinput',
    private enableButton: Locator = page.locator('#enableButton'),
    private inputField: Locator = page.locator('#inputField'),
  ) {}
}
