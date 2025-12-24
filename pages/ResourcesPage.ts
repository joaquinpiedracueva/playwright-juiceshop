import type { Locator, Page } from '../fixtures';

export class ResourcesPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/resources',
    private heading: Locator = page.getByRole('heading', { name: 'Resources' }),
  ) {}
}
