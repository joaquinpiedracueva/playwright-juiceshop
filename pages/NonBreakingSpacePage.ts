import type { Locator, Page } from '../fixtures';

export class NonBreakingSpacePage {
  constructor(
    private page: Page,
    private pageUrl: string = '/nbsp',
    private myButton: Locator = page.getByRole('button', { name: 'My Button' }),
  ) {}
}
