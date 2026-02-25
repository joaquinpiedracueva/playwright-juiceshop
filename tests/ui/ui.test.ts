import { test, expect } from '../fixtures/ui';

test.describe('ui tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('should match home page screenshot', async ({ homePage }) => {
    await homePage.productCards.first().waitFor();
    await expect(homePage.page).toHaveScreenshot('home-page.png');
  });
  test('should match nav component screenshot', async ({ navComponent }) => {
    await navComponent.accountMenuButton.waitFor();
    await expect(navComponent.component).toHaveScreenshot('nav-component.png');
  });
  test('should match sidebar component screenshot', async ({ navComponent, sidebarComponent }) => {
    await navComponent.openSidenavButton.click();
    await sidebarComponent.customerFeedbackLink.waitFor();
    await expect(sidebarComponent.component).toHaveScreenshot('sidebar-component.png');
  });
  test('should match register page screenshot', async ({ registerPage, navComponent }) => {
    await navComponent.logout();
    await registerPage.goto();
    await expect(registerPage.page).toHaveScreenshot('register-page.png');
  });
  test('should match login page screenshot', async ({ loginPage, navComponent }) => {
    await navComponent.logout();
    await loginPage.goto();
    await expect(loginPage.page).toHaveScreenshot('login-page.png');
  });
  test('should logout when authenticated', async ({ navComponent }) => {
    await expect(navComponent.shoppingCart).toBeVisible();
    await navComponent.logout();
    await expect(navComponent.shoppingCart).not.toBeVisible();
  });
  test.fixme(
    'should match home page accessibility guidelines',
    {
      annotation: { type: 'issue', description: 'https://github.com/joaquinpiedracueva/playwright-juiceshop/issues/4' },
    },
    async ({ axeBuilder }) => {
      const results = await axeBuilder.analyze();
      expect(results.violations).toEqual([]);
    },
  );
});
