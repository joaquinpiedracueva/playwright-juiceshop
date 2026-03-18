import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './environments';

export default defineConfig({
  globalSetup: './tests/setup/global.setup.ts',
  globalTeardown: './tests/teardown/global.teardown.ts',
  use: {
    baseURL: BASE_URL,
    screenshot: process.env.CI ? 'only-on-failure' : 'only-on-failure',
    trace: process.env.CI ? 'retain-on-failure' : 'retain-on-failure',
    video: process.env.CI ? 'off' : 'retain-on-failure',
  },
  testDir: './tests',
  fullyParallel: process.env.CI ? false : true,
  expect: {
    timeout: process.env.CI ? 30000 : 30000,
    toHaveScreenshot: process.env.CI ? { maxDiffPixelRatio: 0.03 } : { maxDiffPixelRatio: 0.03 },
  },
  forbidOnly: process.env.CI ? true : false,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: process.env.CI ? [['github'], ['blob']] : [['html', { open: 'on-failure' }]],
  timeout: process.env.CI ? 30000 : 30000,
  projects: [
    {
      name: 'api',
      testDir: './tests/api',
    },
    {
      name: 'ui-auth',
      testDir: './tests/setup',
      testMatch: 'auth.ui.setup.ts',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      dependencies: ['ui-auth'],
      grepInvert: /@mobile-only/,
      snapshotPathTemplate: 'tests/baselines/desktop/{arg}{ext}',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/auth.json',
      },
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      dependencies: ['ui-auth'],
      grepInvert: [/@mobile-only/, /@screenshot/],
      use: {
        ...devices['Desktop Firefox'],
        storageState: '.auth/auth.json',
      },
    },
    {
      name: 'ui-webkit',
      testDir: './tests/ui',
      dependencies: ['ui-auth'],
      grepInvert: [/@mobile-only/, /@screenshot/],
      use: {
        ...devices['Desktop Safari'],
        storageState: '.auth/auth.json',
      },
    },
    {
      name: 'ui-mobile-pixel',
      testDir: './tests/ui',
      dependencies: ['ui-auth'],
      grepInvert: [/@desktop-only/, /@screenshot/],
      use: {
        ...devices['Pixel 5'],
        storageState: '.auth/auth.json',
      },
    },
    {
      name: 'ui-mobile-iphone',
      testDir: './tests/ui',
      dependencies: ['ui-auth'],
      grepInvert: /@desktop-only/,
      snapshotPathTemplate: 'tests/baselines/mobile/{arg}{ext}',
      use: {
        ...devices['iPhone 13'],
        storageState: '.auth/auth.json',
      },
    },
  ],
});
