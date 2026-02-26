import { test, expect } from '../fixtures/api';
import { generateEmail, generatePassword } from '../helpers/generate';
import { securityQuestions } from '../helpers/security-questions';

test('register a new user', async ({ request }) => {
  const email = generateEmail();
  const password = generatePassword();

  const response = await request.post('/api/Users/', {
    data: {
      email,
      password,
      passwordRepeat: password,
      securityQuestion: { id: securityQuestions.favoritePet.id, question: securityQuestions.favoritePet.question },
      securityAnswer: securityQuestions.favoritePet.answer,
    },
  });
  const body = await response.json();

  expect(response.status()).toBe(201);
  expect(body.status).toBe('success');
  expect(body.data.email).toBe(email);
  expect(body.data.role).toBe('customer');
  expect(body.data.isActive).toBe(true);
});

test('login with valid credentials', async ({ request, registerUser }) => {
  const email = generateEmail();
  const password = generatePassword();
  await registerUser(email, password);

  const response = await request.post('/rest/user/login', {
    data: { email, password },
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.authentication.token).toBeTruthy();
  expect(body.authentication.umail).toBe(email);
});

test('change password', async ({ request, registerUser, loginUser }) => {
  const email = generateEmail();
  const password = generatePassword();
  const newPassword = generatePassword();
  await registerUser(email, password);
  const loginResponse = await loginUser(email, password);
  const auth = await loginResponse.json();

  const response = await request.get('/rest/user/change-password', {
    params: {
      current: password,
      new: newPassword,
      repeat: newPassword,
    },
    headers: {
      Authorization: `Bearer ${auth.authentication.token}`,
    },
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.user.email).toBe(email);

  const newLoginResponse = await loginUser(email, newPassword);
  expect(newLoginResponse.status()).toBe(200);
});
