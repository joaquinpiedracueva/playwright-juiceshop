import type { Locator, Page } from '../fixtures';

export class ClickPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/click',
    private badButton: Locator = page.locator('#badButton'),
  ) {}
}
