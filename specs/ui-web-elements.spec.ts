import { test, expect } from '../test';

test.describe('UI Web Element Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all login page elements', async ({ loginPage }) => {
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.credentialsContainer).toBeVisible();
    await expect(loginPage.credentialsInfo).toBeVisible();
    await expect(loginPage.passwordInfo).toBeVisible();
  });

  test('should display headerComponent elements after login', async ({ loginPage, headerComponent }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();

    await expect(headerComponent.heading).toBeVisible();
    await expect(headerComponent.shoppingCartLink).toBeVisible();
  });

  test('should display footerComponent elements after login', async ({ loginPage, footerComponent }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();

    await expect(footerComponent.container).toBeVisible();
    await expect(footerComponent.socialTwitter).toBeVisible();
    await expect(footerComponent.socialFacebook).toBeVisible();
    await expect(footerComponent.socialLinkedin).toBeVisible();
  });

  test('should display inventory page elements', async ({ loginPage, inventoryPage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();

    await expect(inventoryPage.title).toBeVisible();
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.sortDropdown).toBeVisible();
    await expect(inventoryPage.activeSortOption).toHaveText('Name (A to Z)');
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('should display inventory item page elements', async ({ loginPage, inventoryPage, inventoryItemPage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await inventoryPage.inventoryItems.first().getByTestId('inventory-item-name').click();

    await expect(inventoryItemPage.backToProductsButton).toBeVisible();
    await expect(inventoryItemPage.itemContainer).toBeVisible();
    await expect(inventoryItemPage.itemName).toBeVisible();
    await expect(inventoryItemPage.itemDescription).toBeVisible();
    await expect(inventoryItemPage.itemPrice).toBeVisible();
    await expect(inventoryItemPage.addToCartButton).toBeVisible();
  });

  test('should display cart page elements', async ({ loginPage, inventoryPage, headerComponent, cartPage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await inventoryPage.inventoryItems.first().getByRole('button', { name: 'Add to cart' }).click();
    await headerComponent.shoppingCartLink.click();

    await expect(cartPage.title).toBeVisible();
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.cartContentsContainer).toBeVisible();
    await expect(cartPage.cartList).toBeVisible();
    await expect(cartPage.cartQuantityLabel).toBeVisible();
    await expect(cartPage.cartDescLabel).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.itemQuantity).toBeVisible();
    await expect(cartPage.itemName).toBeVisible();
    await expect(cartPage.itemDescription).toBeVisible();
    await expect(cartPage.itemPrice).toBeVisible();
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();
  });

  test('should display checkout step one page elements', async ({ loginPage, inventoryPage, headerComponent, cartPage, checkoutStepOnePage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await inventoryPage.inventoryItems.first().getByRole('button', { name: 'Add to cart' }).click();
    await headerComponent.shoppingCartLink.click();
    await cartPage.checkoutButton.click();

    await expect(checkoutStepOnePage.title).toBeVisible();
    await expect(checkoutStepOnePage.title).toHaveText('Checkout: Your Information');
    await expect(checkoutStepOnePage.checkoutInfoContainer).toBeVisible();
    await expect(checkoutStepOnePage.firstNameInput).toBeVisible();
    await expect(checkoutStepOnePage.lastNameInput).toBeVisible();
    await expect(checkoutStepOnePage.postalCodeInput).toBeVisible();
    await expect(checkoutStepOnePage.cancelButton).toBeVisible();
    await expect(checkoutStepOnePage.continueButton).toBeVisible();
  });

  test('should display checkout step two page elements', async ({ loginPage, inventoryPage, headerComponent, cartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
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

    await expect(checkoutStepTwoPage.title).toBeVisible();
    await expect(checkoutStepTwoPage.title).toHaveText('Checkout: Overview');
    await expect(checkoutStepTwoPage.checkoutSummaryContainer).toBeVisible();
    await expect(checkoutStepTwoPage.cartList).toBeVisible();
    await expect(checkoutStepTwoPage.cartQuantityLabel).toBeVisible();
    await expect(checkoutStepTwoPage.cartDescLabel).toBeVisible();
    await expect(checkoutStepTwoPage.cartItems).toHaveCount(1);
    await expect(checkoutStepTwoPage.itemQuantity).toBeVisible();
    await expect(checkoutStepTwoPage.itemName).toBeVisible();
    await expect(checkoutStepTwoPage.itemDescription).toBeVisible();
    await expect(checkoutStepTwoPage.itemPrice).toBeVisible();
    await expect(checkoutStepTwoPage.paymentInfoLabel).toBeVisible();
    await expect(checkoutStepTwoPage.paymentInfoValue).toBeVisible();
    await expect(checkoutStepTwoPage.shippingInfoLabel).toBeVisible();
    await expect(checkoutStepTwoPage.shippingInfoValue).toBeVisible();
    await expect(checkoutStepTwoPage.totalInfoLabel).toBeVisible();
    await expect(checkoutStepTwoPage.subtotalLabel).toBeVisible();
    await expect(checkoutStepTwoPage.taxLabel).toBeVisible();
    await expect(checkoutStepTwoPage.totalLabel).toBeVisible();
    await expect(checkoutStepTwoPage.cancelButton).toBeVisible();
    await expect(checkoutStepTwoPage.finishButton).toBeVisible();
  });

  test('should display checkout complete page elements', async ({ loginPage, inventoryPage, headerComponent, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
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

    await expect(checkoutCompletePage.title).toBeVisible();
    await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutCompletePage.checkoutCompleteContainer).toBeVisible();
    await expect(checkoutCompletePage.ponyExpressImage).toBeVisible();
    await expect(checkoutCompletePage.completeHeader).toBeVisible();
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.completeText).toBeVisible();
    await expect(checkoutCompletePage.backToProductsButton).toBeVisible();
  });
});
