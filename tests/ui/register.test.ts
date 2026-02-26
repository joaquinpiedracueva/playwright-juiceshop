import { test, expect } from '../fixtures/ui';
import { generateEmail, generatePassword } from '../helpers/generate';
import { securityQuestions } from '../helpers/security-questions';

test.use({ storageState: { cookies: [], origins: [] } });

test('should register a new user @desktop-only', async ({ homePage, registerPage, loginPage, navComponent }) => {
  const email = generateEmail();
  const password = generatePassword();
  await homePage.dismissDialogs();
  await navComponent.accountMenuButton.click();
  await navComponent.loginMenuButton.click();
  await loginPage.notYetCustomerLink.click();
  await registerPage.register(
    email,
    password,
    securityQuestions.motherMaidenName.question,
    securityQuestions.motherMaidenName.answer,
  );
  await expect(registerPage.snackbarMessage).toBeVisible();
  await registerPage.snackbarCloseButton.click();
  await expect(registerPage.snackbarMessage).toBeHidden();
  await expect(loginPage.heading).toBeVisible();
});
