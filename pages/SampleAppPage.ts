import type { Locator, Page } from '../fixtures';

export class SampleAppPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/sampleapp',
    private usernameInput: Locator = page.getByRole('textbox', { name: 'User Name' }),
    private passwordInput: Locator = page.getByRole('textbox', { name: 'Password' }),
    private loginButton: Locator = page.locator('#login'),
    private loginStatus: Locator = page.locator('#loginstatus'),
  ) {}
}
