import fs from 'fs';
import { test as auth } from '../fixtures/ui';
import { generateEmail, generatePassword } from '../helpers/generate';
import { securityQuestions } from '../helpers/security-questions';

const authFile = '.auth/auth.json';

auth.skip(() => fs.existsSync(authFile), 'auth.json already exists');

auth('register and login user', async ({ page, homePage, navComponent, registerPage, loginPage }) => {
  const email = generateEmail();
  const password = generatePassword();
  await homePage.dismissDialogs();
  await registerPage.goto();
  await registerPage.register(
    email,
    password,
    securityQuestions.favoriteBook.question,
    securityQuestions.favoriteBook.answer,
  );
  await loginPage.login(email, password);
  await navComponent.shoppingCart.waitFor();
  await page.context().storageState({ path: authFile });
});
