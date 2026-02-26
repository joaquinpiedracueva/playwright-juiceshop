import { test, expect } from '../fixtures/ui';

test.describe('user interface', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should match home page screenshot @desktop-only @screenshot', async ({ homePage }) => {
    await homePage.productCards.first().waitFor();
    await expect(homePage.page).toHaveScreenshot('home-page.png');
  });

  test('should match nav component screenshot @desktop-only @screenshot', async ({ navComponent }) => {
    await navComponent.accountMenuButton.waitFor();
    await expect(navComponent.component).toHaveScreenshot('nav-component.png');
  });

  test('should match sidebar component screenshot @desktop-only @screenshot', async ({
    navComponent,
    sidebarComponent,
  }) => {
    await navComponent.openSidenavButton.click();
    await sidebarComponent.customerFeedbackLink.waitFor();
    await expect(sidebarComponent.component).toHaveScreenshot('sidebar-component.png');
  });

  test('should match register page screenshot @desktop-only @screenshot', async ({ registerPage, navComponent }) => {
    await navComponent.logout();
    await registerPage.goto();
    await expect(registerPage.page).toHaveScreenshot('register-page.png');
  });
  test('should match login page screenshot @desktop-only @screenshot', async ({ loginPage, navComponent }) => {
    await navComponent.logout();
    await loginPage.goto();
    await expect(loginPage.page).toHaveScreenshot('login-page.png');
  });

  test('should match home page screenshot @mobile-only @screenshot', async ({ homePage }) => {
    await homePage.productCards.first().waitFor();
    await expect(homePage.page).toHaveScreenshot('home-page.png');
  });

  test('should match nav component screenshot @mobile-only @screenshot', async ({ navComponent }) => {
    await navComponent.shoppingCart.waitFor();
    await expect(navComponent.component).toHaveScreenshot('nav-component.png');
  });

  test('should match sidebar component screenshot @mobile-only @screenshot', async ({
    navComponent,
    sidebarComponent,
  }) => {
    await navComponent.openSidenavButton.click();
    await sidebarComponent.customerFeedbackLink.waitFor();
    await expect(sidebarComponent.component).toHaveScreenshot('sidebar-component.png');
  });

  test('should match register page screenshot @mobile-only @screenshot', async ({
    registerPage,
    navComponent,
    sidebarComponent,
  }) => {
    await navComponent.openSidenavButton.click();
    await sidebarComponent.logoutButton.click();
    await registerPage.goto();
    await expect(registerPage.page).toHaveScreenshot('register-page.png');
  });

  test('should match login page screenshot @mobile-only @screenshot', async ({
    loginPage,
    navComponent,
    sidebarComponent,
  }) => {
    await navComponent.openSidenavButton.click();
    await sidebarComponent.logoutButton.click();
    await loginPage.goto();
    await expect(loginPage.page).toHaveScreenshot('login-page.png');
  });

  test('should logout when authenticated @desktop-only', async ({ navComponent }) => {
    await expect(navComponent.shoppingCart).toBeVisible();
    await navComponent.logout();
    await expect(navComponent.shoppingCart).toBeHidden();
  });

  test('should logout when authenticated @mobile-only', async ({ navComponent, sidebarComponent }) => {
    await expect(navComponent.shoppingCart).toBeVisible();
    await navComponent.openSidenavButton.click();
    await sidebarComponent.logoutButton.click();
    await expect(navComponent.shoppingCart).toBeHidden();
  });

  test.fixme(
    'should match home page accessibility guidelines @desktop-only',
    {
      annotation: { type: 'issue', description: 'https://github.com/joaquinpiedracueva/playwright-juiceshop/issues/4' },
    },
    async ({ axeBuilder }) => {
      const results = await axeBuilder.analyze();
      expect(results.violations).toEqual([]);
    },
  );
});
