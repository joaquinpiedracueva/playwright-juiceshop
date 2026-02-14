import { test as auth, expect } from './test';

auth('register and login user', async ({ page, navComponent, registerPage, loginPage }) => {
  const email = `user_${Date.now()}@juiceshop.com`;
  const password = 'validPassword12345';

  // Register
  await registerPage.goto();
  await navComponent.dismissDialogs();
  await registerPage.register(email, password, 'Your eldest siblings middle name?', 'John');

  //Login
  await loginPage.login(email, password);
  await expect(navComponent.shoppingCart).toBeVisible();

  // Save storage state
  await page.context().storageState({ path: 'storage-state/auth.json' });
});
