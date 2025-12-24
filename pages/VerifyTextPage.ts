import type { Locator, Page } from '../fixtures';

export class VerifyTextPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/verifytext',
    private welcomeText: Locator = page.locator('.bg-primary'),
  ) {}
}
