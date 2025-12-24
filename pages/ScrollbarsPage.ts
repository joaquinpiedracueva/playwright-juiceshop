import type { Locator, Page } from '../fixtures';

export class ScrollbarsPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/scrollbars',
    private hidingButton: Locator = page.locator('#hidingButton'),
  ) {}
}
