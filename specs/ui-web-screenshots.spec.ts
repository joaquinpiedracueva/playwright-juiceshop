import { test, expect } from '../test';

test.describe('UI Web Screenshot Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should match login page screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('should match inventory page screenshot', async ({ page, loginPage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await expect(page).toHaveScreenshot('inventory-page.png');
  });

  test('should match inventory item page screenshot', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await inventoryPage.inventoryItems.first().getByTestId('inventory-item-name').click();
    await expect(page).toHaveScreenshot('inventory-item-page.png');
  });

  test('should match cart page screenshot', async ({ page, loginPage, inventoryPage, headerComponent }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await inventoryPage.inventoryItems.first().getByRole('button', { name: 'Add to cart' }).click();
    await headerComponent.shoppingCartLink.click();
    await expect(page).toHaveScreenshot('cart-page.png');
  });

  test('should match checkout step one page screenshot', async ({ page, loginPage, inventoryPage, headerComponent, cartPage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await inventoryPage.inventoryItems.first().getByRole('button', { name: 'Add to cart' }).click();
    await headerComponent.shoppingCartLink.click();
    await cartPage.checkoutButton.click();
    await expect(page).toHaveScreenshot('checkout-step-one-page.png');
  });

  test('should match checkout step two page screenshot', async ({ page, loginPage, inventoryPage, headerComponent, cartPage, checkoutStepOnePage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await inventoryPage.inventoryItems.first().getByRole('button', { name: 'Add to cart' }).click();
    await headerComponent.shoppingCartLink.click();
    await cartPage.checkoutButton.click();
    await checkoutStepOnePage.firstNameInput.fill('Test');
    await checkoutStepOnePage.lastNameInput.fill('User');
    await checkoutStepOnePage.postalCodeInput.fill('12345');
    await checkoutStepOnePage.continueButton.click();
    await expect(page).toHaveScreenshot('checkout-step-two-page.png');
  });

  test('should match checkout complete page screenshot', async ({ page, loginPage, inventoryPage, headerComponent, cartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await inventoryPage.inventoryItems.first().getByRole('button', { name: 'Add to cart' }).click();
    await headerComponent.shoppingCartLink.click();
    await cartPage.checkoutButton.click();
    await checkoutStepOnePage.firstNameInput.fill('Test');
    await checkoutStepOnePage.lastNameInput.fill('User');
    await checkoutStepOnePage.postalCodeInput.fill('12345');
    await checkoutStepOnePage.continueButton.click();
    await checkoutStepTwoPage.finishButton.click();
    await expect(page).toHaveScreenshot('checkout-complete-page.png');
  });
});
