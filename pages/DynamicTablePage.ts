import type { Locator, Page } from '../fixtures';

export class DynamicTablePage {
  constructor(
    private page: Page,
    private pageUrl: string = '/dynamictable',
    private table: Locator = page.getByRole('table'),
    private chromeRow: Locator = page.getByRole('row').filter({ hasText: 'Chrome' }),
    private cpuLabel: Locator = page.locator('.bg-warning'),
  ) {}
}
