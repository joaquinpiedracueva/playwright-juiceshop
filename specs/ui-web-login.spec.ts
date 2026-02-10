import { test, expect } from '../test';

test.describe('UI Web Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display error message with locked out user', async ({ loginPage }) => {
    await loginPage.usernameInput.fill(process.env.LOCKED_OUT_USER!);
    await loginPage.passwordInput.fill(process.env.LOCKED_OUT_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('should login correctly with standard user', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.passwordInput.fill(process.env.STANDARD_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeHidden();
    await expect(page).toHaveURL(inventoryPage.url);
  });

  test('should login correctly with problem user', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.usernameInput.fill(process.env.PROBLEM_USER!);
    await loginPage.passwordInput.fill(process.env.PROBLEM_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeHidden();
    await expect(page).toHaveURL(inventoryPage.url);
  });

  test('should login correctly with performance glitch user', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.usernameInput.fill(process.env.PERFORMANCE_GLITCH_USER!);
    await loginPage.passwordInput.fill(process.env.PERFORMANCE_GLITCH_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeHidden();
    await expect(page).toHaveURL(inventoryPage.url);
  });

  test('should login correctly with error user', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.usernameInput.fill(process.env.ERROR_USER!);
    await loginPage.passwordInput.fill(process.env.ERROR_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeHidden();
    await expect(page).toHaveURL(inventoryPage.url);
  });

  test('should login correctly with visual user', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.usernameInput.fill(process.env.VISUAL_USER!);
    await loginPage.passwordInput.fill(process.env.VISUAL_USER_PASSWORD!);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeHidden();
    await expect(page).toHaveURL(inventoryPage.url);
  });

  test('should display error when submitting empty username', async ({ loginPage }) => {
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });

  test('should display error when submitting empty password', async ({ loginPage }) => {
    await loginPage.usernameInput.fill(process.env.STANDARD_USER!);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
  });

  test('should display error with invalid credentials', async ({ loginPage }) => {
    await loginPage.usernameInput.fill('invalid_user');
    await loginPage.passwordInput.fill('wrong_password');
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('should dismiss error message when clicking error button', async ({ loginPage }) => {
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.errorButton.click();
    await expect(loginPage.errorMessage).toBeHidden();
  });

  test('should display correct credentials info', async ({ loginPage }) => {
    await expect(loginPage.credentialsInfo).toContainText('standard_user');
    await expect(loginPage.credentialsInfo).toContainText('locked_out_user');
    await expect(loginPage.credentialsInfo).toContainText('problem_user');
    await expect(loginPage.credentialsInfo).toContainText('performance_glitch_user');
    await expect(loginPage.credentialsInfo).toContainText('error_user');
    await expect(loginPage.credentialsInfo).toContainText('visual_user');
    await expect(loginPage.passwordInfo).toContainText('secret_sauce');
  });
});
