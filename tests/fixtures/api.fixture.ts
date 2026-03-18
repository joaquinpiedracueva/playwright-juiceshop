import { test as base, expect } from '@playwright/test';
import type { APIResponse, APIRequestContext, TestInfo } from '@playwright/test';
import { registerResponseSchema } from '../schemas/register.schema';
import { loginResponseSchema } from '../schemas/login.schema';
import { changePasswordResponseSchema } from '../schemas/change-password.schema';

export const schemas = {
  register: registerResponseSchema,
  login: loginResponseSchema,
  changePassword: changePasswordResponseSchema,
};

export const test = base.extend({});

export { expect };
export type { APIResponse, APIRequestContext, TestInfo };
