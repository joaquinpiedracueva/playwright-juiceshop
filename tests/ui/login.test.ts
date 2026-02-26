import { test, expect } from '../fixtures/ui';
import { generateEmail, generatePassword } from '../helpers/generate';
import { securityQuestions } from '../helpers/security-questions';

test.use({ storageState: { cookies: [], origins: [] } });

test('should login with valid credentials @desktop-only', async ({
  homePage,
  registerPage,
  loginPage,
  navComponent,
}) => {
  const email = generateEmail();
  const password = generatePassword();
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
