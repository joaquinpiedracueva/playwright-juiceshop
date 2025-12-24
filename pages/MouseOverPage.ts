import type { Locator, Page } from '../fixtures';

export class MouseOverPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/mouseover',
    private clickMeLink: Locator = page.getByRole('link', { name: 'Click me' }),
    private clickCount: Locator = page.locator('#clickCount'),
  ) {}
}
