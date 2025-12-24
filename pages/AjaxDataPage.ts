import type { Locator, Page } from '../fixtures';

export class AjaxDataPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/ajax',
    private triggerButton: Locator = page.getByRole('button', { name: 'Button Triggering AJAX Request' }),
    private loadedContent: Locator = page.locator('.bg-success'),
  ) {}
}
