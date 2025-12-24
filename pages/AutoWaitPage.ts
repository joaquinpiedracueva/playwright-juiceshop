import type { Locator, Page } from '../fixtures';

export class AutoWaitPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/autowait',
    private targetButton: Locator = page.locator('#target'),
    private applyButton: Locator = page.getByRole('button', { name: 'Apply' }),
  ) {}
}
