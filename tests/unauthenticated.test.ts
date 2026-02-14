import { test, expect } from '../test';

test.describe('unauthenticated', () => {
test.use({ storageState: { cookies: [], origins: [] } });

test('should register a new user', { tag: '@web' }, async ({ navComponent, registerPage, loginPage }) => {
    await registerPage.goto();
    await navComponent.dismissDialogs();
    const email = `user_${Date.now()}@juiceshop.com`;
    const password = 'new_password';
    await registerPage.register(email, password, 'Your eldest siblings middle name?', 'Bob');
    await expect(loginPage.heading).toBeVisible();
  });

test('should login with valid credentials', { tag: '@web' }, async ({ navComponent, loginPage }) => {
    await loginPage.goto();
    await navComponent.dismissDialogs();
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await expect(navComponent.shoppingCart).toBeVisible();
  });
});
