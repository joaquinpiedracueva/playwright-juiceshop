import type { Locator, Page } from '../fixtures';

export class HiddenLayersPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/hiddenlayers',
    private greenButton: Locator = page.locator('#greenButton'),
    private blueButton: Locator = page.locator('#blueButton'),
  ) {}
}
