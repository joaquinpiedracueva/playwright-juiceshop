import type { Locator, Page } from '../fixtures';

export class ClassAttributePage {
  constructor(
    private page: Page,
    private pageUrl: string = '/classattr',
    private primaryButton: Locator = page.locator('button.btn-primary'),
    private successButton: Locator = page.locator('button.btn-success'),
    private warningButton: Locator = page.locator('button.btn-warning'),
  ) {}
}
