import { defineConfig, devices } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const AUTH_STATE = '.auth/auth.json';

export default defineConfig({
  webServer: {
    command: 'docker compose up',
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 30000,
  },
  globalTeardown: './tests/global-teardown.ts',
  use: {
    baseURL: BASE_URL,
    screenshot: process.env.CI ? 'only-on-failure' : 'only-on-failure',
    trace: process.env.CI ? 'retain-on-failure' : 'retain-on-failure',
    video: process.env.CI ? 'off' : 'retain-on-failure',
  },
  testDir: './tests',
  fullyParallel: process.env.CI ? false : true,
  expect: {
    timeout: process.env.CI ? 60000 : 45000,
    toHaveScreenshot: process.env.CI ? { maxDiffPixelRatio: 0.03 } : { maxDiffPixelRatio: 0.03 },
  },
  forbidOnly: process.env.CI ? true : false,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 5,
  reporter: process.env.CI ? [['github'], ['blob']] : [['html', { open: 'on-failure' }]],
  timeout: process.env.CI ? 120000 : 90000,
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
        storageState: AUTH_STATE,
      },
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      dependencies: ['ui-auth'],
      grepInvert: [/@mobile-only/, /@screenshot/],
      use: {
        ...devices['Desktop Firefox'],
        storageState: AUTH_STATE,
      },
    },
    {
      name: 'ui-webkit',
      testDir: './tests/ui',
      dependencies: ['ui-auth'],
      grepInvert: [/@mobile-only/, /@screenshot/],
      use: {
        ...devices['Desktop Safari'],
        storageState: AUTH_STATE,
      },
    },
    {
      name: 'ui-mobile-pixel',
      testDir: './tests/ui',
      dependencies: ['ui-auth'],
      grepInvert: [/@desktop-only/, /@screenshot/],
      use: {
        ...devices['Pixel 5'],
        storageState: AUTH_STATE,
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
        storageState: AUTH_STATE,
      },
    },
  ],
});
