import { test, expect } from '../fixtures/api';
import { generateEmail, generatePassword } from '../helpers/generate';

test.describe('API', () => {
  test('register a new user', async ({ registerUser }) => {
    const email = generateEmail();
    const password = generatePassword();

    const response = await registerUser(email, password);
    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.status).toBe('success');
    expect(body.data.email).toBe(email);
    expect(body.data.role).toBe('customer');
    expect(body.data.isActive).toBe(true);
  });

  test('login with valid credentials', async ({ registerUser, loginUser }) => {
    const email = generateEmail();
    const password = generatePassword();
    await registerUser(email, password);

    const response = await loginUser(email, password);
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
});
