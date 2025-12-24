import type { Locator, Page } from '../fixtures';

export class LoadDelayPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/loaddelay',
    private appearingButton: Locator = page.getByRole('button', { name: 'Button Appearing After Delay' }),
  ) {}
}
