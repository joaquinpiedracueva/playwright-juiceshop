import type { Locator, Page } from '../fixtures';

export class FileUploadPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/upload',
    private fileInput: Locator = page.locator('input[type="file"]'),
  ) {}
}
