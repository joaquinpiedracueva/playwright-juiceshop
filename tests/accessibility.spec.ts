import { test, expect } from '../fixtures';
import AxeBuilder from '@axe-core/playwright';

type Tag = 'wcag2a' | 'wcag2aa' | 'wcag2aaa' | 'wcag21a' | 'wcag21aa' | 'wcag22aa' | 'best-practice' | 'section508';
type Result = 'NoViolations';
type TestCase = `${Tag} - ${Result}`;

test.describe('a11y.me Accessibility', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('wcag2a - NoViolations' satisfies TestCase, async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('wcag2aa - NoViolations' satisfies TestCase, async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('wcag2aaa - NoViolations' satisfies TestCase, async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aaa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('wcag21a - NoViolations' satisfies TestCase, async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag21a'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('wcag21aa - NoViolations' satisfies TestCase, async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('wcag22aa - NoViolations' satisfies TestCase, async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag22aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('best-practice - NoViolations' satisfies TestCase, async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['best-practice'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('section508 - NoViolations' satisfies TestCase, async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['section508'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});