import type { Locator, Page } from '../fixtures';

export class AlertsPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/alerts',
    private alertButton: Locator = page.locator('#alertButton'),
    private confirmButton: Locator = page.locator('#confirmButton'),
    private promptButton: Locator = page.locator('#promptButton'),
  ) {}
}
