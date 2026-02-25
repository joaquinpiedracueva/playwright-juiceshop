import type { Locator, Page } from '@playwright/test';

export class SidebarComponent {
  readonly page: Page;
  readonly component: Locator;
  readonly heading: Locator;
  readonly customerFeedbackLink: Locator;
  readonly aboutUsLink: Locator;
  readonly photoWallLink: Locator;
  readonly beginnersTutorialLink: Locator;
  readonly githubLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.component = page.locator('mat-sidenav');
    this.heading = page.getByRole('heading', { name: 'OWASP Juice Shop' });
    this.customerFeedbackLink = page.getByLabel('Go to contact us page');
    this.aboutUsLink = page.getByLabel('Go to about us page');
    this.photoWallLink = page.getByLabel('Go to photo wall');
    this.beginnersTutorialLink = page.getByLabel('Launch beginners tutorial');
    this.githubLink = page.getByLabel('Go to OWASP Juice Shop GitHub page');
  }
}
