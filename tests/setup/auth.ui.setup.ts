import fs from 'fs';
import { test as auth, expect } from '../fixtures/ui';
import { generateEmail, generatePassword } from '../helpers/generate';

const authFile = '.auth/auth.json';

auth.skip(() => fs.existsSync(authFile), 'auth.json already exists');

auth('register and login user', async ({ page, navComponent, registerPage, loginPage }) => {
  const email = generateEmail();
  const password = generatePassword();
  await registerPage.goto();
  await navComponent.dismissDialogs();
  await registerPage.register(email, password, 'Your eldest siblings middle name?', 'John');
  await loginPage.login(email, password);
  await navComponent.shoppingCart.waitFor();
  await page.context().storageState({ path: authFile });
});
