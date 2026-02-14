import { test, expect } from '../test';

test.describe('authenticated', () => {
  test('should logout when authenticated', { tag: '@web' }, async ({ navComponent, homePage }) => {
    await homePage.goto();
    await navComponent.dismissDialogs();
    await expect(navComponent.shoppingCart).toBeVisible();
    await navComponent.logout();
    await expect(navComponent.shoppingCart).not.toBeVisible();
  });
});
