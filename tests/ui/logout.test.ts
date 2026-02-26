import { test, expect } from '../fixtures/ui';

test('should logout when authenticated @desktop-only', async ({ navComponent }) => {
  await navComponent.accountMenuButton.click();
  await navComponent.logoutMenuButton.click();
  await expect(navComponent.shoppingCart).toBeHidden();
});

test('should logout when authenticated @mobile-only', async ({ navComponent, sidebarComponent }) => {
  await navComponent.openSidenavButton.click();
  await sidebarComponent.logoutButton.click();
  await expect(navComponent.shoppingCart).toBeHidden();
});
