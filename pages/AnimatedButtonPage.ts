import type { Locator, Page } from '../fixtures';

export class AnimatedButtonPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/animation',
    private startAnimationButton: Locator = page.locator('#animationButton'),
    private movingTarget: Locator = page.locator('.moving'),
  ) {}
}
