import fs from 'fs';
import { faker } from '@faker-js/faker';
import { test as auth } from '../fixtures/ui.fixture';
import { securityQuestions } from '../helpers/security-questions.helper';

const authFile = '.auth/auth.json';

auth.skip(() => fs.existsSync(authFile), 'auth.json already exists');

auth('register and login user', async ({ page, homePage, navComponent, registerPage, loginPage }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();
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
