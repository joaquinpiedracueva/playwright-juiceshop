import { test, expect } from './fixtures';

test.describe('api tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
});
