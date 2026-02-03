import { test, expect } from '../test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have no wcag2a violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should have no wcag2aa violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should have no wcag2aaa violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aaa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should have no wcag21a violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag21a'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should have no wcag21aa violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should have no wcag22aa violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag22aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should have no best-practice violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['best-practice'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should have no section508 violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['section508'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});