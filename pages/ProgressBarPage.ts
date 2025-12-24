import type { Locator, Page } from '../fixtures';

export class ProgressBarPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/progressbar',
    private startButton: Locator = page.locator('#startButton'),
    private stopButton: Locator = page.locator('#stopButton'),
    private progressBar: Locator = page.locator('#progressBar'),
  ) {}
}
