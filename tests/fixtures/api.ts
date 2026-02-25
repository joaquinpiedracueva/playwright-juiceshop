import { test as base, expect } from '@playwright/test';
import type { APIResponse, APIRequestContext, TestInfo } from '@playwright/test';

type Fixtures = {
  registerUser: (email: string, password: string) => Promise<APIResponse>;
  loginUser: (email: string, password: string) => Promise<APIResponse>;
};

export const test = base.extend<Fixtures>({
  registerUser: async ({ request }, use) => {
    await use((email, password) =>
      request.post('/api/Users/', {
        data: {
          email,
          password,
          passwordRepeat: password,
          securityQuestion: { id: 1, question: 'Your eldest siblings middle name?' },
          securityAnswer: 'John',
        },
      }),
    );
  },
  loginUser: async ({ request }, use) => {
    await use((email, password) =>
      request.post('/rest/user/login', {
        data: { email, password },
      }),
    );
  },
});

export { expect };
export type { APIResponse, APIRequestContext, TestInfo };
