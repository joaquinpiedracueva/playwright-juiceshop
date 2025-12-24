import type { Locator, Page } from '../fixtures';

export class ClientSideDelayPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/clientdelay',
    private triggerButton: Locator = page.getByRole('button', { name: 'Button Triggering Client Side Logic' }),
    private loadedContent: Locator = page.locator('.bg-success'),
  ) {}
}
