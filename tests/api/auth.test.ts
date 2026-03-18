import { faker } from '@faker-js/faker';
import { test, expect, schemas } from '../fixtures/api.fixture';
import { securityQuestions } from '../helpers/security-questions.helper';

test('register a new user', async ({ request }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();

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
  const parsed = schemas.register.parse(body);
  expect(parsed.data.email).toBe(email);
  expect(parsed.data.role).toBe('customer');
  expect(parsed.data.isActive).toBe(true);
});

test('login with valid credentials', async ({ request }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  await request.post('/api/Users/', {
    data: {
      email,
      password,
      passwordRepeat: password,
      securityQuestion: { id: securityQuestions.favoritePet.id, question: securityQuestions.favoritePet.question },
      securityAnswer: securityQuestions.favoritePet.answer,
    },
  });

  const response = await request.post('/rest/user/login', {
    data: { email, password },
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  const parsed = schemas.login.parse(body);
  expect(parsed.authentication.token).toBeTruthy();
  expect(parsed.authentication.umail).toBe(email);
});

test('change password', async ({ request }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const newPassword = faker.internet.password();

  await request.post('/api/Users/', {
    data: {
      email,
      password,
      passwordRepeat: password,
      securityQuestion: { id: securityQuestions.favoritePet.id, question: securityQuestions.favoritePet.question },
      securityAnswer: securityQuestions.favoritePet.answer,
    },
  });
  const loginResponse = await request.post('/rest/user/login', { data: { email, password } });
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
  const parsed = schemas.changePassword.parse(body);
  expect(parsed.user.email).toBe(email);

  const newLoginResponse = await request.post('/rest/user/login', { data: { email, password: newPassword } });
  expect(newLoginResponse.status()).toBe(200);
});
