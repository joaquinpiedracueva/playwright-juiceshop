import type { Locator, Page } from '../fixtures';

export class VisibilityPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/visibility',
    private hideButton: Locator = page.locator('#hideButton'),
    private removedButton: Locator = page.locator('#removedButton'),
    private zeroWidthButton: Locator = page.locator('#zeroWidthButton'),
    private overlappedButton: Locator = page.locator('#overlappedButton'),
    private transparentButton: Locator = page.locator('#transparentButton'),
    private invisibleButton: Locator = page.locator('#invisibleButton'),
    private notdisplayedButton: Locator = page.locator('#notdisplayedButton'),
    private offscreenButton: Locator = page.locator('#offscreenButton'),
  ) {}
}
