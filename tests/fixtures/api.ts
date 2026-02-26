import { test as base, expect } from '@playwright/test';
import type { APIResponse, APIRequestContext, TestInfo } from '@playwright/test';
import { securityQuestions } from '../helpers/security-questions';

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
          securityQuestion: {
            id: securityQuestions.eldestSiblingMiddleName.id,
            question: securityQuestions.eldestSiblingMiddleName.question,
          },
          securityAnswer: securityQuestions.eldestSiblingMiddleName.answer,
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
