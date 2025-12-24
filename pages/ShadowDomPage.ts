import type { Locator, Page } from '../fixtures';

export class ShadowDomPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/shadowdom',
    private generateButton: Locator = page.locator('guid-generator').getByRole('button', { name: 'Generate' }),
    private copyButton: Locator = page.locator('guid-generator').getByRole('button', { name: 'Copy' }),
    private guidInput: Locator = page.locator('guid-generator').locator('#editField'),
  ) {}
}
