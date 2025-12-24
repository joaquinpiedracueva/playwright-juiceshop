import type { Locator, Page } from '../fixtures';

export class OverlappedElementPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/overlapped',
    private idInput: Locator = page.locator('#id'),
    private nameInput: Locator = page.locator('#name'),
  ) {}
}
