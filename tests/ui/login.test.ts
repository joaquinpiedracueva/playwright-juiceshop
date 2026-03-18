import { faker } from '@faker-js/faker';
import { test, expect } from '../fixtures/ui.fixture';
import { securityQuestions } from '../helpers/security-questions.helper';

test.use({ storageState: { cookies: [], origins: [] } });

test('should login with valid credentials @desktop-only', async ({
  homePage,
  registerPage,
  loginPage,
  navComponent,
}) => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  await homePage.dismissDialogs();
  await navComponent.accountMenuButton.click();
  await navComponent.loginMenuButton.click();
  await loginPage.notYetCustomerLink.click();
  await registerPage.register(
    email,
    password,
    securityQuestions.favoriteMovie.question,
    securityQuestions.favoriteMovie.answer,
  );
  await loginPage.login(email, password);
  await expect(navComponent.shoppingCart).toBeVisible();
});
